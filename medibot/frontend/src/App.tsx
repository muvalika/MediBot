// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Calendar, Clock, Stethoscope, Download } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

interface FAQ {
    question: string;
    answer: string;
  }
  
  interface FAQCategory {
    category: string;
    questions: FAQ[];
  }

const faqData: FAQCategory[] = [
  {
    category: 'General Health Issues FAQ\'s',
    questions: [
      {
        question: 'What are common symptoms of a cold?',
        answer: `Common symptoms of a cold include a runny or stuffy nose, sore throat, cough, sneezing, mild body aches, and a low-grade fever. To relieve cold symptoms, ensure plenty of rest and drink fluids. Over-the-counter medications like acetaminophen or ibuprofen can help with pain and fever. Use saline nasal sprays for nasal congestion, and throat lozenges or warm saltwater gargles for sore throats. Consult a doctor if symptoms persist for more than 10 days or worsen.`
      },
      {
        question: 'What are some effective solutions for headaches?',
        answer: `Headaches can be caused by various factors such as stress, dehydration, or lack of sleep. To relieve headaches, make sure to stay hydrated, take a break from screens, and rest in a quiet, dark room. Taking over-the-counter pain relievers like ibuprofen or aspirin can also help. If you have chronic or severe headaches, consult a healthcare professional to rule out underlying conditions like migraines or tension headaches.`
      },
      {
        question: 'How can I manage stress effectively?',
        answer: `Effective stress management techniques include regular exercise, practicing mindfulness and meditation, deep breathing exercises, getting enough sleep, and taking regular breaks from work or daily tasks. To manage stress, incorporate daily relaxation practices such as yoga or mindfulness meditation. Regular physical activity like walking or swimming can also reduce stress levels. Limit caffeine and alcohol, and make time for activities you enjoy. If stress becomes overwhelming, consider seeing a counselor or therapist for further support.`
      },
      {
        question: 'What should I do if I feel fatigued all the time?',
        answer: `Chronic fatigue can be caused by a variety of factors, including poor sleep quality, poor nutrition, or underlying health issues like anemia or thyroid problems. To combat fatigue, ensure you are getting enough quality sleep (7-9 hours per night). Check your diet to ensure you're getting enough iron, vitamins, and other essential nutrients. Regular exercise can boost energy levels. If fatigue persists, visit a doctor to rule out underlying medical conditions.`
      },
      {
        question: 'What are the best practices for maintaining healthy blood pressure?',
        answer: `Maintaining a healthy blood pressure involves regular exercise, eating a balanced diet with plenty of fruits and vegetables, reducing salt intake, managing stress, limiting alcohol consumption, and avoiding smoking. To lower or maintain healthy blood pressure, exercise regularly (at least 150 minutes per week), reduce sodium intake, eat foods rich in potassium (like bananas and leafy greens), and maintain a healthy weight. Limit alcohol and avoid smoking. If you have high blood pressure, your doctor may recommend medication to manage it.`
      },
      {
        question: 'How can I improve my sleep quality?',
        answer: `To improve sleep quality, establish a consistent sleep routine, create a relaxing environment, limit caffeine intake before bed, and avoid using electronic devices. Create a calming bedtime routine with activities such as reading or a warm bath. Keep your bedroom cool, dark, and quiet. Limit screen time at least an hour before bedtime and avoid large meals or caffeine in the evening. If sleep problems persist, consult a healthcare provider to explore potential underlying conditions.`
      },
      {
        question: 'What are solutions for managing high cholesterol?',
        answer: `Managing high cholesterol often involves dietary changes, such as reducing intake of saturated fats and trans fats, increasing fiber intake, exercising regularly, and, if needed, taking medications prescribed by your healthcare provider. To lower cholesterol, focus on a heart-healthy diet that includes plenty of fiber-rich foods like oats, beans, and vegetables. Choose healthy fats like olive oil and nuts over saturated fats. Regular physical activity, such as walking or swimming, can help reduce cholesterol levels. Your doctor may recommend cholesterol-lowering medication if necessary.`
      },
      {
        question: 'How can I prevent heart disease?',
        answer: `Preventing heart disease involves maintaining a healthy lifestyle, including regular exercise, a heart-healthy diet, not smoking, managing stress, controlling blood pressure, and regular screenings for cholesterol levels. To prevent heart disease, exercise regularly, eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. Avoid smoking and limit alcohol. Manage your weight, blood pressure, and cholesterol levels. Regular check-ups with your doctor will help catch any potential problems early.`
      },
      {
        question: 'What are some solutions for dealing with anxiety?',
        answer: `Managing anxiety involves relaxation techniques such as deep breathing, progressive muscle relaxation, and mindfulness. For anxiety, practice deep breathing exercises and mindfulness meditation to calm the mind. Exercise regularly to release tension and boost mood. Limit caffeine and practice good sleep hygiene. If anxiety is persistent or interferes with daily life, seeking help from a counselor or therapist is recommended.`
      },
      {
        question: 'What are the common causes of back pain and how can I manage it?',
        answer: `Back pain can be caused by poor posture, muscle strain, injuries, or underlying conditions like arthritis. To manage back pain, focus on strengthening your core muscles through exercises such as Pilates or yoga. Maintain good posture when sitting or standing and avoid heavy lifting. Stretch regularly and take breaks from sitting for long periods. If back pain is severe or persistent, consult a healthcare provider for further assessment.`
      },
      {
        question: 'How can I stay hydrated?',
        answer: `Staying hydrated involves drinking adequate amounts of water throughout the day, especially during hot weather or when engaging in physical activity. Drink at least 8-10 cups of water daily, more if you're physically active or in a hot climate. Eat water-rich foods like cucumbers, watermelon, and oranges. Carry a reusable water bottle to remind yourself to drink throughout the day. Avoid sugary drinks and alcohol as they can contribute to dehydration.`
      },
      {
        question: 'What are the early signs of diabetes?',
        answer: `Early signs of diabetes include increased thirst, frequent urination, fatigue, blurred vision, and slow-healing sores. To manage or prevent diabetes, focus on a balanced diet with low sugar and carbohydrate intake. Exercise regularly to maintain a healthy weight and help your body use insulin more effectively. If you experience symptoms of diabetes, consult a healthcare provider for blood tests to check your blood sugar levels.`
      },
      {
        question: 'How can I manage asthma?',
        answer: `Asthma symptoms include wheezing, coughing, shortness of breath, and chest tightness. To manage asthma, follow your healthcare provider’s instructions for using inhalers and medications. Avoid triggers like smoke, allergens, or cold air. Regular exercise can help improve lung function, but it’s important to keep an inhaler handy for emergencies. If symptoms worsen, seek medical attention to adjust medications.`
      },
      {
        question: 'What should I do if I have high blood sugar?',
        answer: `High blood sugar symptoms include excessive thirst, frequent urination, and fatigue. To manage high blood sugar, focus on a low-sugar diet and monitor your blood glucose levels regularly. Engage in regular physical activity and stay hydrated. If blood sugar remains high, your healthcare provider may recommend medication to control blood glucose. For diabetics, managing insulin levels is key to avoiding complications.`
      },
      {
        question: 'What are the symptoms and solutions for anemia?',
        answer: `Anemia symptoms can include fatigue, pale skin, shortness of breath, and dizziness. To address anemia, eat iron-rich foods like spinach, red meat, and legumes. Vitamin C-rich foods, such as oranges and strawberries, can enhance iron absorption. If iron supplements are prescribed, follow your doctor’s guidelines to avoid side effects. In severe cases, blood transfusions or other treatments may be necessary.`
      },
      {
        question: 'How can I manage high cholesterol?',
        answer: `To manage high cholesterol, reduce your intake of saturated fats and increase your consumption of fiber-rich foods like oats, beans, and fruits. Engage in regular physical activity to improve heart health. Include healthy fats such as those found in olive oil, nuts, and avocados. If necessary, your doctor may prescribe medications such as statins to help lower your cholesterol levels. Regular blood tests will help monitor your cholesterol levels.`
      },
      {
        question: 'What are some effective treatments for acid reflux?',
        answer: `Acid reflux symptoms include heartburn, chest pain, and a sour taste in the mouth. To reduce acid reflux, avoid large meals, spicy foods, caffeine, and alcohol. Eat smaller meals throughout the day and avoid lying down immediately after eating. Elevating the head of your bed can help reduce nighttime symptoms. If symptoms persist, your doctor may recommend antacids or medications like proton pump inhibitors.`
      },
      {
        question: 'What can I do to improve my mental health?',
        answer: `To improve mental health, incorporate stress-relieving activities like yoga, meditation, and mindfulness into your daily routine. Exercise regularly, as physical activity can boost mood and reduce anxiety. Make time for social interactions with friends and family. Ensure you are getting enough sleep (7-9 hours per night) and avoid excessive alcohol or drug use. If you're struggling with mental health, seeking therapy or counseling can provide professional support.`
      },
      {
        question: 'What are the common causes of joint pain and how can I manage it?',
        answer: `Joint pain can be caused by arthritis, overuse, injury, or aging. To manage joint pain, engage in low-impact exercises like swimming or cycling. Regular stretching and strength training can improve joint flexibility. Apply hot or cold packs to relieve pain and inflammation. Maintain a healthy weight to reduce strain on joints, particularly the knees and hips. For persistent or severe pain, consult a doctor for medication or physical therapy.`
      },
      {
        question: 'What are the symptoms of dehydration and how can I treat it?',
        answer: `Dehydration symptoms include dry mouth, dark urine, dizziness, and fatigue. To prevent dehydration, ensure you're drinking enough water throughout the day, especially during hot weather or physical activity. Eat water-rich foods like cucumbers, watermelon, and oranges. For mild dehydration, drinking water and replenishing electrolytes with drinks like coconut water or sports drinks can help. If dehydration is severe, medical attention may be necessary for IV fluids.`
      },
      {
        question: 'How can I reduce the risk of stroke?',
        answer: `Reducing the risk of stroke involves managing risk factors like high blood pressure, high cholesterol, and diabetes. Eat a heart-healthy diet, exercise regularly, avoid smoking, and limit alcohol consumption. Regular check-ups with your doctor can help detect early signs of stroke risk. Taking prescribed medications like blood thinners or antihypertensives can also help lower the risk of stroke. If you experience any symptoms of a stroke, seek emergency medical care immediately.`
      },
      {
        question: 'What can I do to lower my blood pressure naturally?',
        answer: `To lower blood pressure naturally, reduce sodium intake, increase potassium-rich foods like bananas and spinach, and engage in regular physical activity. Focus on eating a diet rich in fruits, vegetables, whole grains, and lean proteins. Practice relaxation techniques such as deep breathing or meditation to manage stress. Limiting alcohol and caffeine intake and maintaining a healthy weight can also help. If lifestyle changes are not enough, your doctor may prescribe medication to control blood pressure.`
      }
    ]
  }
];

  
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  available: string[];
};

type AppointmentData = {
  name: string;
  email: string;
  phone: string;
  doctor_id: number;
  date: string;
  time: string;
  reason: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am MediBot. How can I help you with your health concerns today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    name: '',
    email: '',
    phone: '',
    doctor_id: 0,
    date: '',
    time: '',
    reason: ''
  });
  const [nftUrl, setNftUrl] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null); // Track active question
  
  const toggleAnswer = (index: number) => {
    // If clicked on the same question, hide it, otherwise show the clicked question's answer
    setActiveQuestionIndex(activeQuestionIndex === index ? null : index);
  };

  // Generate time slots from 9 AM to 6 PM (every hour)
  const generateTimeSlots = () => {
    const timeSlots: string[] = [];
    const startHour = 9;
    const endHour = 18; // 6 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      const hourStr = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      timeSlots.push(hourStr);
    }

    return timeSlots;
  };

  // Initialize state: Available time slots (predefined from 9 AM to 6 PM)
  const [availableTimes, setAvailableTimes] = useState<string[]>(generateTimeSlots());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [takenTimes, setTakenTimes] = useState<Set<string>>(new Set()); // Track taken time slots

  // Simulate the process of selecting a time slot
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setTakenTimes((prev) => new Set(prev.add(time))); // Mark selected time as taken
  };

  // Get remaining available times (filter out taken times)
  const remainingAvailableTimes = availableTimes.filter(
    (time) => !takenTimes.has(time)
  );

  // Fetch doctors list
  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data.doctors));
  }, []);

  useEffect(() => {
    // You can also simulate fetching remaining available slots from an API or backend
    console.log("Remaining Available Times: ", remainingAvailableTimes);
  }, [takenTimes]); // Re-run this effect when the takenTimes change

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Send to backend
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage })
      });
      const data = await response.json();
      
      // Add bot response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);

      // Show appointment form if relevant
      if (inputMessage.toLowerCase().includes('appointment') || 
          inputMessage.toLowerCase().includes('doctor')) {
        setShowAppointmentForm(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBookAppointment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });
      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: `Your appointment has been booked! Your NFT is ready to download.`,
          sender: 'bot',
          timestamp: new Date()
        }]);
        setNftUrl(`http://localhost:5000/${data.nft_path}`);
        setShowAppointmentForm(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };
  const handleDownloadFile = async () => {
    // Assuming nftUrl contains the actual file URL or path to the file
    const fileUrl = "/nfts/medical_nft_1.dcm"; // Change this to the actual file path
  
    try {
      // Fetch the file from the URL
      const response = await fetch(fileUrl);
  
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
  
      // Convert the response to a Blob
      const blob = await response.blob();
  
      // Create a download link
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
  
      // Provide a fallback filename if the split result is undefined
      link.download = fileUrl.split("/").pop() || "default_filename.dcm"; // Fallback to "default_filename.dcm"
  
      document.body.appendChild(link); // Append the link to the document
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up the DOM
  
      // Optionally, revoke the URL after the download to free memory
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };  

  return (
    <div className="min-h-screen bg-gray-50 main-body gradient-background">
      <div className="max-w-4xl mx-auto p-4">
        <header className="bg-white shadow rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Stethoscope className="h-6 w-6" />
            MediBot Health Assistant
          </h1>
          <p className="text-gray-600">AI-powered medical consultation and appointment system</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === 'user' 
                    ? 'bg-blue-600 text-gray' 
                    : 'bg-gray-200 text-gray-800'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span className="text-xs opacity-70">typing...</span>
                  </div>
                  <div className="flex space-x-1 mt-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Appointment Form */}
          {showAppointmentForm && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book Appointment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={appointmentData.name}
                    onChange={(e) => setAppointmentData({...appointmentData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={appointmentData.email}
                    onChange={(e) => setAppointmentData({...appointmentData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded"
                    value={appointmentData.phone}
                    onChange={(e) => setAppointmentData({...appointmentData, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={appointmentData.doctor_id}
                    onChange={(e) => setAppointmentData({...appointmentData, doctor_id: parseInt(e.target.value)})}
                  >
                    <option value="0">Select a doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} ({doctor.specialty})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={appointmentData.date}
                    onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                  />
                </div>
                
                <div>
                <label htmlFor="appointment-time">Select a Time:</label>
                    <select
                    id="appointment-time"
                    value={selectedTime}
                    onChange={(e) => handleTimeSelect(e.target.value)}
                    className="p-2 border rounded"
                    >
                    <option value="">Select a time</option>
                    {remainingAvailableTimes.length === 0 ? (
                        <option value="">No available times</option>
                    ) : (
                        remainingAvailableTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                        ))
                    )}
                    </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    value={appointmentData.reason}
                    onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowAppointmentForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-gray rounded hover:bg-blue-700"
                  onClick={handleBookAppointment}
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          )}

          {/* NFT Download */}
        {nftUrl && (
        <div className="p-4 border-t border-gray-200 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                {/* Your download icon */}
                <Download className="h-5 w-5 text-green-600" />
              </div>
              <span className="font-medium text-green-800">
                Your Medical Consultation NFT is ready!
              </span>
            </div>
            <button
              onClick={handleDownloadFile}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition duration-300"
            >
              Download NFT
            </button>
          </div>
        </div>
      )}

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2 mb-2 flex-wrap">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-sm rounded-full text-gray-700 flex items-center gap-1 transition-all duration-300"
                onClick={() => handleQuickAction('I have a headache')}
              >
                <span>Headache</span>
              </button>
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-sm rounded-full text-gray-700 flex items-center gap-1 transition-all duration-300"
                onClick={() => handleQuickAction('I have fever')}
              >
                <span>Fever</span>
              </button>
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-sm rounded-full text-gray-700 flex items-center gap-1 transition-all duration-300"
                onClick={() => handleQuickAction('I need to see a doctor')}
              >
                <span>Book Appointment</span>
              </button>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-4 border-2 border-gray-300 rounded-xl text-lg"
                placeholder="Type your health concern..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="p-2 bg-blue-600 text-gray rounded hover:bg-blue-700"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>


<div>
      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="faq-category">
          <h2>{category.category}</h2>
          <div className="questions-list">
            {category.questions.map((question, index) => (
              <div key={index} className="faq-item">
                <div className="question" onClick={() => toggleAnswer(index)}>
                <button className="toggle-button">
                    {activeQuestionIndex === index ? '-' : '+'}
                  </button>
                  <span>{question.question}</span> 
                </div>
                {activeQuestionIndex === index && (
                  <div
                    className="answer"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
            
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;