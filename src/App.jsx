import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Schedule from './pages/Schedule';
import ChatBot from './pages/ChatBot';
import MyPage from './pages/Mypage';

function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    hometown: '',
    child1: '',
    child2: ''
  });

  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (savedInfo) {
      setUserInfo(savedInfo);
    }
  }, []);

  const updateUserInfo = (newInfo) => {
    setUserInfo(newInfo);
    localStorage.setItem('userInfo', JSON.stringify(newInfo));
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/chatbot" element={<ChatBot userInfo={userInfo} />} />
          <Route path="/mypage" element={<MyPage userInfo={userInfo} updateUserInfo={updateUserInfo} />} />
          <Route path="/" element={<Schedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
