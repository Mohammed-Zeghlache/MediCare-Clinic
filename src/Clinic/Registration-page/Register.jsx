import React, { useState, useEffect } from 'react';
import { FaUser, FaIdCard, FaBirthdayCake, FaClock, FaHospital, FaClipboardCheck, FaBell, FaCalendarDay } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdClose } from 'react-icons/io';
import './Register.css';

const Register = () => {
  // Get today's date in YYYY-MM-DD format
  const getToday = () => new Date().toISOString().split('T')[0];
  const [today, setToday] = useState(getToday());
  
  // Load data from localStorage with date key
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '' });
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem(`clinicPatients_${today}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [nextQueueNumber, setNextQueueNumber] = useState(() => {
    const saved = localStorage.getItem(`clinicQueueNumber_${today}`);
    return saved ? parseInt(saved) : 1;
  });
  const [notification, setNotification] = useState(null);

  // Check and update date daily
  useEffect(() => {
    const checkDate = () => {
      const currentDate = getToday();
      if (currentDate !== today) {
        setToday(currentDate);
        // Reset queue for new day
        setPatients([]);
        setNextQueueNumber(1);
      }
    };
    
    // Check date on mount
    checkDate();
    
    // Check every minute
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, [today]);

  // Save to localStorage with today's date
  useEffect(() => {
    localStorage.setItem(`clinicPatients_${today}`, JSON.stringify(patients));
  }, [patients, today]);

  useEffect(() => {
    localStorage.setItem(`clinicQueueNumber_${today}`, JSON.stringify(nextQueueNumber));
  }, [nextQueueNumber, today]);

  // Auto-clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newPatient = {
      id: Date.now(),
      ...formData,
      queueNumber: nextQueueNumber,
      time,
      date: today,
      status: 'waiting'
    };

    // Add patient to queue
    const updatedPatients = [newPatient, ...patients];
    setPatients(updatedPatients);
    setNextQueueNumber(prev => prev + 1);
    
    // Save to localStorage
    localStorage.setItem(`clinicPatients_${today}`, JSON.stringify(updatedPatients));
    localStorage.setItem(`clinicQueueNumber_${today}`, (nextQueueNumber + 1).toString());
    
    // ================== FIX: Trigger doctor notification ==================
    // Create and dispatch a storage event for Doctor page
    const event = new StorageEvent('storage', {
      key: `clinicPatients_${today}`,
      newValue: JSON.stringify(updatedPatients),
      oldValue: JSON.stringify(patients),
      url: window.location.href,
      storageArea: localStorage
    });
    
    // Manually trigger storage event for same page (for cross-tab communication)
    window.dispatchEvent(event);
    
    // Also set a timestamp flag that Doctor can check
    localStorage.setItem('lastPatientUpdate', Date.now().toString());
    // ======================================================================
    
    // Show success notification
    setNotification({
      type: 'success',
      message: `Patient ${formData.firstName} ${formData.lastName} registered`,
      details: `Queue #${nextQueueNumber} | Sent to doctor ✓`
    });

    // Clear form
    setFormData({ firstName: '', lastName: '', age: '' });

    // Console log for debugging
    console.log('📤 Patient sent to doctor:', newPatient);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearTodayData = () => {
    if (window.confirm('Clear all today\'s patient data?')) {
      setPatients([]);
      setNextQueueNumber(1);
      localStorage.setItem(`clinicPatients_${today}`, JSON.stringify([]));
      localStorage.setItem(`clinicQueueNumber_${today}`, '1');
      
      // Trigger update for doctor page
      const event = new StorageEvent('storage', {
        key: `clinicPatients_${today}`,
        newValue: JSON.stringify([])
      });
      window.dispatchEvent(event);
      
      setNotification({
        type: 'info',
        message: 'Today\'s data cleared',
        details: 'Queue reset to #1'
      });
    }
  };

  const completePatient = (id) => {
    const updatedPatients = patients.map(patient => 
      patient.id === id ? { ...patient, status: 'completed' } : patient
    );
    
    setPatients(updatedPatients);
    
    // Save to localStorage and trigger doctor update
    localStorage.setItem(`clinicPatients_${today}`, JSON.stringify(updatedPatients));
    
    const event = new StorageEvent('storage', {
      key: `clinicPatients_${today}`,
      newValue: JSON.stringify(updatedPatients)
    });
    window.dispatchEvent(event);
    
    setNotification({
      type: 'info',
      message: 'Patient marked as completed',
      details: 'Removed from waiting queue'
    });
  };

  // Load past completed patients (from previous days)
  const loadPastCompletions = () => {
    const pastPatients = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('clinicPatients_')) {
        const date = key.split('_')[1];
        if (date !== today) {
          const dayPatients = JSON.parse(localStorage.getItem(key) || '[]');
          const completed = dayPatients.filter(p => p.status === 'completed');
          completed.forEach(p => pastPatients.push({
            ...p,
            date,
            displayDate: new Date(date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })
          }));
        }
      }
    });
    
    // Sort by date (newest first)
    return pastPatients.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Listen for patient completions from Doctor page
  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.key && e.key.startsWith('clinicPatients_') && e.key.includes(today)) {
        const updatedPatients = JSON.parse(e.newValue || '[]');
        setPatients(updatedPatients);
      }
    };

    window.addEventListener('storage', handleStorageUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [today]);

  const waitingPatients = patients.filter(p => p.status === 'waiting');
  const completedToday = patients.filter(p => p.status === 'completed');
  const pastCompletions = loadPastCompletions();
  const nowServing = waitingPatients.length > 0 ? waitingPatients[waitingPatients.length - 1] : null;

  // Format today's date nicely
  const formattedToday = new Date(today).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="clinic-dashboard">
      {/* Notification Toast */}
      {notification && (
        <div className={`notification-toast ${notification.type}`}>
          <div className="toast-content">
            {notification.type === 'success' && <IoMdCheckmarkCircle className="toast-icon" />}
            <div>
              <strong>{notification.message}</strong>
              <p>{notification.details}</p>
            </div>
          </div>
          <button onClick={() => setNotification(null)} className="toast-close">
            <IoMdClose />
          </button>
        </div>
      )}

      {/* Header with Date */}
      <div className="dashboard-header">
        <div className="header-left">
          <FaHospital className="hospital-logo" />
          <div>
            <h1>MediCare Clinic</h1>
            <p className="clinic-subtitle">Patient Queue Management System</p>
            <div className="date-display">
              <FaCalendarDay className="date-icon" />
              <span className="current-date">{formattedToday}</span>
            </div>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-box">
            <span className="stat-label">Next Queue</span>
            <span className="stat-value">{nextQueueNumber}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Waiting</span>
            <span className="stat-value waiting-count">{waitingPatients.length}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Serving</span>
            <span className="stat-value serving-number">
              {nowServing ? `#${nowServing.queueNumber}` : '---'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content - No scrolling */}
      <div className="dashboard-content">
        {/* Left Side - Registration */}
        <div className="registration-panel">
          <div className="panel-card">
            <div className="panel-header">
              <FaClipboardCheck className="panel-icon" />
              <h2>New Patient Registration</h2>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
              <div className="input-row">
                <div className="input-field">
                  <label>
                    <FaUser className="field-icon" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Patient's first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="input-field">
                  <label>
                    <FaIdCard className="field-icon" />
                    Family Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Family name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="input-field">
                <label>
                  <FaBirthdayCake className="field-icon" />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="120"
                  autoComplete="off"
                />
              </div>

              <div className="queue-info">
                <span className="queue-today">Queue for Today</span>
                <span className="queue-assigned">Assigned Number: #{nextQueueNumber}</span>
              </div>

              <button type="submit" className="register-btn">
                <FaBell className="btn-icon" />
                Register & Notify Doctor
              </button>
            </form>

            <div className="form-actions">
              <button onClick={clearTodayData} className="clear-btn">
                Reset Today's Data
              </button>
              <div className="form-info">
                <FaClock className="info-icon" />
                <span>Real-time doctor notifications enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Queue Display */}
        <div className="queue-panel">
          <div className="panel-card">
            <div className="panel-header">
              <h2>Live Patient Queue</h2>
              <div className="queue-status">
                <span className="status-badge now-serving">
                  Now Serving: {nowServing ? `#${nowServing.queueNumber}` : '---'}
                </span>
                <span className="status-badge waiting">
                  Waiting: {waitingPatients.length}
                </span>
              </div>
            </div>

            {patients.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👨‍⚕️</div>
                <h3>No patients today</h3>
                <p>Register a patient to start today's queue</p>
              </div>
            ) : (
              <div className="queue-container">
                {/* Now Serving Card */}
                {nowServing && (
                  <div className="now-serving-card">
                    <div className="serving-header">
                      <h3>Currently Consulting</h3>
                      <button 
                        onClick={() => completePatient(nowServing.id)}
                        className="complete-btn"
                      >
                        Mark Complete
                      </button>
                    </div>
                    <div className="serving-details">
                      <div className="patient-info">
                        <span className="queue-badge large">#{nowServing.queueNumber}</span>
                        <div className="patient-name">
                          <strong>{nowServing.firstName} {nowServing.lastName}</strong>
                          <span className="patient-age">Age: {nowServing.age}</span>
                        </div>
                      </div>
                      <div className="patient-time">
                        <FaClock className="time-icon" />
                        <span>Arrived: {nowServing.time}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Waiting Queue */}
                <div className="waiting-queue">
                  <h4>Waiting Patients ({waitingPatients.length - (nowServing ? 1 : 0)})</h4>
                  <div className="waiting-list">
                    {waitingPatients
                      .filter(p => !nowServing || p.id !== nowServing.id)
                      .map(patient => (
                        <div key={patient.id} className="waiting-patient">
                          <span className="queue-badge">#{patient.queueNumber}</span>
                          <div className="patient-details">
                            <span className="patient-name">{patient.firstName} {patient.lastName}</span>
                            <span className="patient-meta">
                              Age: {patient.age} • {patient.time}
                            </span>
                          </div>
                          <button 
                            onClick={() => completePatient(patient.id)}
                            className="small-complete-btn"
                          >
                            Complete
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Completed Today - Scrollable */}
                {completedToday.length > 0 && (
                  <div className="completed-section">
                    <h4>Completed Today ({completedToday.length})</h4>
                    <div className="completed-scroll">
                      {completedToday.map(patient => (
                        <div key={patient.id} className="completed-patient">
                          <span className="completed-badge">✓</span>
                          <span className="patient-name">#{patient.queueNumber} {patient.firstName} {patient.lastName}</span>
                          <span className="completion-time">{patient.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Past Completions - Scrollable */}
                {pastCompletions.length > 0 && (
                  <div className="past-completions">
                    <h4>Previously Completed</h4>
                    <div className="past-scroll">
                      {pastCompletions.map((patient, index) => (
                        <div key={`${patient.date}_${index}`} className="past-patient">
                          <div className="past-date">{patient.displayDate}</div>
                          <div className="past-info">
                            <span className="past-number">#{patient.queueNumber}</span>
                            <span className="past-name">{patient.firstName} {patient.lastName}</span>
                          </div>
                          <span className="past-time">{patient.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <div className="footer-info">
          <span className="footer-item">Patients Today: {patients.length}</span>
          <span className="footer-item">Waiting: {waitingPatients.length}</span>
          <span className="footer-item">Queue: {nextQueueNumber - 1}/{nextQueueNumber}</span>
        </div>
        <div className="footer-note">
          Daily queue system • Real-time doctor notifications • All data saved by date
        </div>
      </div>
    </div>
  );
};

export default Register;