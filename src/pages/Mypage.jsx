import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../styles/Mypage.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function MyPage({ userInfo, updateUserInfo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(userInfo);
  const [listeningField, setListeningField] = useState(null);
  const [listening, setListening] = useState(false);

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'ko-KR'; // 한국어 설정

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);
    setListeningField(null);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [listeningField]: transcript,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSave = () => {
    updateUserInfo(info);
    setIsEditing(false);
  };

  const startListening = (field) => {
    setListeningField(field);
    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
  };

  return (
    <div className="my-page">
      <h1>나의 정보</h1>
      <h2>기본</h2>
      
      <div className="info-section">
        {isEditing ? (
          <>
            <label>
              이름:
              <input
                type="text"
                name="name"
                value={info.name}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'black' } }}
                onClick={
                  listening && listeningField === 'name'
                    ? stopListening
                    : () => startListening('name')
                }
              >
                {listening && listeningField === 'name' ? '녹음 중지' : '음성 녹음'}
              </Button>
            </label>
            <label>
              나이:
              <input
                type="text"
                name="age"
                value={info.age}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'black' } }}
                onClick={
                  listening && listeningField === 'age'
                    ? stopListening
                    : () => startListening('age')
                }
              >
                {listening && listeningField === 'age' ? '녹음 중지' : '음성 녹음'}
              </Button>
            </label>
            <label>
              집 주소:
              <input
                type="text"
                name="address"
                value={info.address}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'black' } }}
                onClick={
                  listening && listeningField === 'address'
                    ? stopListening
                    : () => startListening('address')
                }
              >
                {listening && listeningField === 'address' ? '녹음 중지' : '음성 녹음'}
              </Button>
            </label>
            <label>
              전화번호:
              <input
                type="text"
                name="phone"
                value={info.phone}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'black' } }}
                onClick={
                  listening && listeningField === 'phone'
                    ? stopListening
                    : () => startListening('phone')
                }
              >
                {listening && listeningField === 'phone' ? '녹음 중지' : '음성 녹음'}
              </Button>
            </label>
          </>
        ) : (
          <>
            <p>이름 : {info.name}</p>
            <p style={{ marginTop: '10px' }}>나이 : {info.age}</p>
            <p style={{ marginTop: '10px' }}>집 주소 : {info.address}</p>
            <p style={{ marginTop: '10px' }}>전화번호 : {info.phone}</p>
          </>
        )}
      </div>
      <h2>기타</h2>
      <div className="info-section">
        {isEditing ? (
          <>
            <label>
              고향 :     
              <input
                type="text"
                name="hometown"
                value={info.hometown}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'black' } }}
                onClick={
                  listening && listeningField === 'hometown'
                    ? stopListening
                    : () => startListening('hometown')
                }
              >
                {listening && listeningField === 'hometown' ? '녹음 중지' : '음성 녹음'}
              </Button>
            </label>
            <label>
              첫째 자녀 :
              <input
                type="text"
                name="child1"
                value={info.child1}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'black' } }}
                onClick={
                  listening && listeningField === 'child1'
                    ? stopListening
                    : () => startListening('child1')
                }
              >
                {listening && listeningField === 'child1' ? '녹음 중지' : '음성 녹음'}
              </Button>
            </label>
            <label>
              둘째 자녀 :
              <input
                type="text"
                name="child2"
                value={info.child2}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'black' } }}
                onClick={
                  listening && listeningField === 'child2'
                    ? stopListening
                    : () => startListening('child2')
                }
              >
                {listening && listeningField === 'child2' ? '녹음 중지' : '음성 녹음'}
              </Button>
            </label>
          </>
        ) : (
          <>
            <p>고향 : {info.hometown}</p>
            <p style={{ marginTop: '10px' }}>첫째 자녀 : {info.child1}</p>
            <p style={{ marginTop: '10px' }}>둘째 자녀 : {info.child2}</p>
          </>
        )}
        <div className='editButton'>
          <Button variant="contained" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'darkgreen' } }}
           onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
            {isEditing ? '저장하기' : '수정하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
