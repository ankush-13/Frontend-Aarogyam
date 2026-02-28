import React, { useState, useEffect } from 'react';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cases, setCases] = useState([
    { id: 1, name: "Anita Sharma", dob: "1985-06-15", gender: "Female", phone: "9876543210", symptom: "High Fever", severity: "Severe", location: "Lat: 23.2599, Lng: 77.4126", date: "2026-02-28" },
    { id: 2, name: "Rajesh Kumar", dob: "1990-11-22", gender: "Male", phone: "9123456789", symptom: "Chronic Cough", severity: "Moderate", location: "Lat: 23.2600, Lng: 77.4100", date: "2026-02-27" },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => setIsLoggedIn(false);

  const addNewCase = (newCase) => {
    const today = new Date().toISOString().split('T')[0];
    setCases([{ ...newCase, id: Date.now(), date: today }, ...cases]);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} onLoginClick={() => setShowLoginModal(true)} onLogout={handleLogout} />
      
      <main className="flex-grow pt-16"> {/* Add padding top for fixed navbar */}
        {isLoggedIn ? (
          <Dashboard cases={cases} onAddCase={addNewCase} />
        ) : (
          <LandingPage />
        )}
      </main>

      <Footer />

      {/* Login Modal Overlay */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Worker Login</h2>
              <p className="text-slate-500 text-sm">Access the Aarogyam Dashboard</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">User ID</label>
                <input type="text" placeholder="e.g. CW-4421" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" required />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- NAVBAR COMPONENT ---
const Navbar = ({ isLoggedIn, onLoginClick, onLogout }) => (
  <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-40 h-16 flex items-center">
    <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-lg">+</div>
        <span className="text-2xl font-extrabold text-slate-800 tracking-tight">Aarogyam</span>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={onLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-red-100 transition border border-red-200">
            Logout
          </button>
        ) : (
          <button onClick={onLoginClick} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
            Login
          </button>
        )}
      </div>
    </div>
  </nav>
);

// --- LANDING PAGE COMPONENT ---
const LandingPage = () => {
  return (
    <div>
      <section className="bg-blue-50 py-16 px-6 lg:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Empowering <span className="text-blue-600">Community Health</span> Workers
            </h1>
            <p className="text-lg text-slate-600">
              Aarogyam provides a streamlined platform for field workers to register patients, track symptoms, and monitor local health trends in real-time.
            </p>
            <ul className="space-y-3 text-slate-700 font-medium">
              <li className="flex items-center gap-2">✅ Live Location Tracking for accurate outbreak mapping</li>
              <li className="flex items-center gap-2">✅ Comprehensive Symptom Logging</li>
              <li className="flex items-center gap-2">✅ Secure Patient Data Management</li>
            </ul>
          </div>

          {/* Replaced Login portal with a large image */}
          <div className="lg:w-1/2 w-full">
            <img 
              src="https://media.istockphoto.com/id/1217981399/vector/group-of-multicultural-medicine-workers.jpg?s=612x612&w=0&k=20&c=DsdydNB-J1swniRdkj6BPQ_0Yg8MKaq4bvNqGueDLuk=" 
              alt="Healthcare Workers in the field" 
              className="rounded-2xl shadow-2xl border-8 border-white object-cover h-[450px] w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- DASHBOARD COMPONENT ---
const Dashboard = ({ cases, onAddCase }) => {
  // Symptom list (truncated for brevity, represents 49 symptoms)
  const symptomsList = [
    "High Fever", "Chronic Cough", "Shortness of Breath", "Fatigue", "Body Ache", 
    "Loss of Taste/Smell", "Sore Throat", "Nausea", "Diarrhea", "Skin Rash", 
    "Joint Pain", "Dizziness", "Chest Pain", "Blurry Vision", "Other (Specify in Notes)"
  ];

  const [formData, setFormData] = useState({
    name: '', dob: '', gender: '', phone: '', symptom: '', severity: '', location: ''
  });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const fetchLocation = () => {
    setIsFetchingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData, 
            location: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
          });
          setIsFetchingLocation(false);
        },
        (error) => {
          alert("Could not fetch location. Please allow location permissions.");
          setIsFetchingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsFetchingLocation(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCase(formData);
    // Reset form
    setFormData({ name: '', dob: '', gender: '', phone: '', symptom: '', severity: '', location: '' });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Worker Dashboard</h1>
        <p className="text-slate-500">Register new cases and monitor community health.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Registration Form (Takes up 4 columns) */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b pb-2">Register New Case</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Patient Name</label>
                <input 
                  type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required 
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input 
                  type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required 
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                <div className="flex gap-4">
                  {['Male', 'Female', 'Other'].map(g => (
                    <label key={g} className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer">
                      <input 
                        type="radio" name="gender" value={g} checked={formData.gender === g}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="text-blue-600 focus:ring-blue-500" required
                      /> {g}
                    </label>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                <input 
                  type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required 
                  pattern="[0-9]{10}" placeholder="10-digit number"
                />
              </div>

              {/* Symptoms Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Primary Symptom</label>
                <select 
                  value={formData.symptom} onChange={(e) => setFormData({...formData, symptom: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                >
                  <option value="" disabled>Select a symptom...</option>
                  {symptomsList.map(symp => <option key={symp} value={symp}>{symp}</option>)}
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Severity Level</label>
                <div className="flex gap-4">
                  {['Mild', 'Moderate', 'Severe'].map(lvl => (
                    <label key={lvl} className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer">
                      <input 
                        type="radio" name="severity" value={lvl} checked={formData.severity === lvl}
                        onChange={(e) => setFormData({...formData, severity: e.target.value})}
                        className="text-blue-600 focus:ring-blue-500" required
                      /> {lvl}
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Patient Location</label>
                <div className="flex gap-2">
                  <input 
                    type="text" value={formData.location} readOnly
                    placeholder="Click button to fetch ->"
                    className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none" required 
                  />
                  <button 
                    type="button" onClick={fetchLocation} disabled={isFetchingLocation}
                    className="bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition disabled:opacity-50 whitespace-nowrap"
                  >
                    {isFetchingLocation ? '📍...' : '📍 Fetch'}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md mt-4">
                Submit Patient Data
              </button>
            </form>
          </div>
        </div>

        {/* Case Table (Takes up 8 columns) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-50 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Registered Cases History</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Total: {cases.length}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="text-xs text-slate-500 uppercase bg-white border-b">
                  <tr>
                    <th className="px-6 py-4">Patient Info</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Symptom & Severity</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cases.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.gender} • DOB: {c.dob}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{c.phone}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">{c.symptom}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          c.severity === 'Severe' ? 'bg-red-100 text-red-700' : 
                          c.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {c.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 tracking-tighter">{c.location}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{c.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FOOTER COMPONENT ---
const Footer = () => (
  <footer className="bg-slate-900 text-white py-8 px-6 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
          Aarogyam Portal
        </h3>
        <p className="text-xs text-slate-400 mt-1">Government Health Initiative © 2026</p>
      </div>
      <div className="flex gap-6 text-sm text-slate-300">
        <a href="#" className="hover:text-white transition">Ministry of Health</a>
        <a href="#" className="hover:text-white transition">Help & Support</a>
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
      </div>
    </div>
  </footer>
);