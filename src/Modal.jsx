import React, { useState, useRef } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '25px 30px',
    borderRadius: '12px',
    width: '350px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  },
  inputBox: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginTop: '6px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px',
  },
  submitBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

function Modal() {
  const [showForm, setShowForm] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const dobRef = useRef(null);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal') {
      setShowForm(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const dob = dobRef.current.value;

    if (!username || !email || !phone || !dob) {
      alert('Please fill out all the fields.');
      return;
    }

    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) {
      alert('Invalid date of birth. Date cannot be in the future.');
      return;
    }

    // ✅ Reset fields after successful submission
    usernameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
    dobRef.current.value = '';

    // ✅ Close the modal
    setShowForm(false);
  };

  return (
    <div>
      <h1>User Details Modal</h1>
      <button
        onClick={handleOpenForm}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: '12px 30px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Open Form
      </button>

      {showForm && (
        <div className="modal" style={styles.overlay} onClick={handleOverlayClick}>
          <div className="modal-content" style={styles.modal}>
            <h2 style={{ marginBottom: '20px' }}>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  ref={usernameRef}
                  style={styles.inputBox}
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  style={styles.inputBox}
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  ref={phoneRef}
                  style={styles.inputBox}
                  placeholder="10-digit number"
                />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  ref={dobRef}
                  style={styles.inputBox}
                />
              </div>
              <div style={styles.buttonRow}>
                <button type="submit" className="submit-button" style={styles.submitBtn}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
