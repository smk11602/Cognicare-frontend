import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import '../styles/ChatBot.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const questions = [
  { question: '오늘도 기억을 지키러 와주셔서 기뻐요 :) 성함이 어떻게 되시나요?', key: 'name' },
  { question: '네! {name}님, 다음 질문으로 넘어가볼게요! 현재 어디에 거주하시나요?', key: 'address' },
  { question: '잘하셨네요! {name}님의 전화번호는 무엇인가요?', key: 'phone' },
  { question: '정답입니다:-) {name}님의 고향은 어디였죠?', key: 'hometown' },
  { question: '좋습니다.  첫째 자녀의 이름은?', key: 'child1' },
  { question: '좋아요. 그렇다면 둘째 자녀의 이름은?', key: 'child2' }
];

function ChatBot({ userInfo }) {
  const [messages, setMessages] = useState([
    { text: questions[0].question, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ko-KR'; // 한국어 설정

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    setInput('');

    setTimeout(() => {
      const currentQuestion = questions[currentQuestionIndex];
      if (input.trim() === userInfo[currentQuestion.key]) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
          const nextQuestion = questions[nextQuestionIndex];
          const nextQuestionText = nextQuestion.question.replace(`{${currentQuestion.key}}`, userInfo[currentQuestion.key]);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: nextQuestionText, sender: 'bot' }
          ]);
          setCurrentQuestionIndex(nextQuestionIndex);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: '오늘도 기억 지키기에 성공하셨네요. 축하드립니다 :)', sender: 'bot' }
          ]);
        }
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: '다시 한 번 신중하게 생각해보세요!', sender: 'bot' }
        ]);
      }
    }, 500); // 0.5초 지연
  };

  const startListening = () => {
    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
  };

  return (
    <div className='chat-body'>
      <Paper className="chatbot-container">
        <Typography variant="h5" className="chatbot-title"><img src="/assets/flower.png" alt="flower" className="flower" />  지킴이와의 대화</Typography>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender === 'bot' && <img src="/assets/avartar.png" alt="avartar" className="guardian-icon" />}
              <div className={`message-text ${msg.sender}`}>
                <Typography>{msg.text}</Typography>
              </div>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <TextField
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            전송
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={listening ? stopListening : startListening}
          >
            {listening ? '녹음 중지' : '음성 녹음'}
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default ChatBot;
