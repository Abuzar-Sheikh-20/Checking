import React, { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Alert from './components/Alert';
import TextForm from './components/TextForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';



function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  // Variable to hold the timeout
  let alertTimeout = null;

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    // Clear any previous timeout before setting a new one
    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }

    alertTimeout = setTimeout(() => {
      setAlert(null); // Clear the alert after 3 seconds
    }, 3000);
  };

  const removeThemes = () => {
    document.body.classList.remove('bg-light', 'bg-dark', 'bg-danger', 'bg-success', 'bg-warning');
  };

  const toggleMode = (cls) => {
    removeThemes();
    document.body.classList.add('bg-' + cls);

    if (cls === 'light') {
      setMode('light');
      document.body.style.backgroundColor = '#f8f9fa'; // Light mode background
      document.body.style.color = '#000'; // Dark text
      showAlert('Light theme enabled.', 'success');
    }
    else if (cls === 'warning'){
      document.body.style.backgroundColor = '#8c6a05'; 
      document.body.style.color = 'black';
    }
    else {
      setMode('dark');
      document.body.style.backgroundColor = '#2b2b2b'; // Dark mode background
      document.body.style.color = '#fff'; // Light text
      showAlert(`${cls} theme enabled.`, 'success');
    }
  };

  return (
    <>

    {/* reactrouter.com/web/guides/quick-start   ---------------->>>  Official website for Routers*/}
    <Router>

    <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
    <Alert alert={alert} />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<TextForm heading="Try TextUtils - Enter the text to Proceed - Word & Character Counter | Case converter | Copy or Clear Text | Remove extra spaces" showAlert={showAlert} mode={mode} />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
