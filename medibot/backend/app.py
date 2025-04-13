from flask import Flask, request, jsonify
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from datetime import datetime
import pydicom
from pydicom.uid import generate_uid
import hashlib
import json
import os
from flask_cors import CORS
from pydicom.uid import ImplicitVRLittleEndian

app = Flask(__name__)
CORS(app)

# Initialize ChatterBot
medical_bot = ChatBot(
    'MediBot',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I apologize, but I cannot provide medical diagnoses. Please consult with a healthcare professional.',
            'maximum_similarity_threshold': 0.90
        }
    ]
)

# Train the bot with medical corpus
trainer = ChatterBotCorpusTrainer(medical_bot)
trainer.train("./health_corpus.yml")  # Our custom health corpus
# trainer.train("chatterbot.corpus.english")  # General English language corpus

# Mock database
appointments_db = []
patients_db = []
doctors_db = [
    {"id": 1, "name": "Dr. Sarah Johnson", "specialty": "Cardiology", "available": ["Mon", "Wed", "Fri"]},
    {"id": 2, "name": "Dr. Michael Chen", "specialty": "Neurology", "available": ["Tue", "Thu"]}
]

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    bot_response = str(medical_bot.get_response(user_message))
    
    if 'appointment' in user_message.lower() or 'doctor' in user_message.lower():
        bot_response += " Would you like me to help you book an appointment with a doctor?"
    
    return jsonify({'response': bot_response})

@app.route('/api/doctors', methods=['GET'])
def get_doctors():
    return jsonify({'doctors': doctors_db})

@app.route('/api/book', methods=['POST'])
def book_appointment():
    data = request.json
    patient_id = len(patients_db) + 1
    appointment_id = len(appointments_db) + 1
    
    patient = {
        "id": patient_id,
        "name": data['name'],
        "email": data['email'],
        "phone": data['phone']
    }
    patients_db.append(patient)
    
    appointment = {
        "id": appointment_id,
        "patient_id": patient_id,
        "doctor_id": data['doctor_id'],
        "date": data['date'],
        "time": data['time'],
        "reason": data['reason'],
        "status": "confirmed"
    }
    appointments_db.append(appointment)
    
    nft_path = generate_dicom_nft(appointment)
    
    return jsonify({
        'success': True,
        'appointment': appointment,
        'nft_path': nft_path
    })

def generate_dicom_nft(appointment):
    ds = pydicom.Dataset()
    patient = next(p for p in patients_db if p['id'] == appointment['patient_id'])
    doctor = next(d for d in doctors_db if d['id'] == appointment['doctor_id'])
    
    ds.PatientName = patient['name']
    ds.PatientID = str(patient['id'])
    ds.StudyDate = datetime.now().strftime("%Y%m%d")
    ds.StudyTime = datetime.now().strftime("%H%M%S")
    ds.StudyDescription = f"Medical Consultation NFT - {doctor['name']}"
    ds.PhysicianName = doctor['name']
    ds.AccessionNumber = str(appointment['id'])
    ds.StudyInstanceUID = generate_uid()
    ds.SeriesInstanceUID = generate_uid()
    
    ds.add_new(0x00091001, 'LO', 'Medical Consultation NFT')
    ds.add_new(0x00091002, 'LO', json.dumps({
        'appointment_date': appointment['date'],
        'appointment_time': appointment['time'],
        'reason': appointment['reason'],
        'doctor_specialty': doctor['specialty']
    }))
    
  # Generate a unique SOP Instance UID
    ds.SOPInstanceUID = generate_uid()

    # Set the SOP Class UID (e.g., for CT, you can use the corresponding SOP Class UID)
    ds.SOPClassUID = "1.2.840.10008.5.1.4.1.1.2"  # CT Image Storage SOP Class UID

    # Set the file_meta with the Transfer Syntax UID (Implicit VR Little Endian)
    file_meta = pydicom.dataset.FileMetaDataset()
    file_meta.TransferSyntaxUID = ImplicitVRLittleEndian
    file_meta.MediaStorageSOPClassUID = ds.SOPClassUID  # Media Storage SOP Class UID
    file_meta.MediaStorageSOPInstanceUID = ds.SOPInstanceUID  # Media Storage SOP Instance UID
    ds.file_meta = file_meta

    content_hash = hashlib.sha256(json.dumps(appointment).encode()).hexdigest()
    ds.add_new(0x00091003, 'LO', content_hash)
    
    os.makedirs('nfts', exist_ok=True)
    filename = f"nfts/medical_nft_{appointment['id']}.dcm"
    ds.save_as(filename, write_like_original=False, implicit_vr=True, little_endian=True)
    
    return filename

@app.route('/nfts/<filename>')
def download_file(filename):
    return send_from_directory('nfts', filename)

if __name__ == '__main__':
    app.run(debug=True)