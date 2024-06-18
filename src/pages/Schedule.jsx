import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Schedule.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function Schedule() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [newSchedule, setNewSchedule] = useState('');
  const [listening, setListening] = useState(false);
  const [highlightedDates, setHighlightedDates] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const savedSchedule = localStorage.getItem(selectedDate.toDateString());
      if (savedSchedule) {
        try {
          const parsedSchedule = JSON.parse(savedSchedule);
          if (Array.isArray(parsedSchedule)) {
            setScheduleItems(parsedSchedule);
          } else {
            setScheduleItems([]);
          }
        } catch (error) {
          setScheduleItems([]);
        }
      } else {
        setScheduleItems([]);
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    const datesWithSchedules = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      try {
        const parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue) && parsedValue.length > 0) {
          datesWithSchedules.push(new Date(key));
        }
      } catch (error) {
        // Ignore invalid JSON
      }
    }
    setHighlightedDates(datesWithSchedules);
  }, []);

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
    setNewSchedule(transcript);
  };

  const handleInputChange = (e) => {
    setNewSchedule(e.target.value);
  };

  const addScheduleItem = () => {
    if (newSchedule.trim() === '') {
      alert('계획이 입력되지 않았습니다.');
      return;
    }

    const newItem = {
      text: newSchedule,
      checked: false,
    };
    const updatedItems = [...scheduleItems, newItem];
    setScheduleItems(updatedItems);
    localStorage.setItem(selectedDate.toDateString(), JSON.stringify(updatedItems));
    setNewSchedule('');

    if (!highlightedDates.includes(selectedDate.toDateString())) {
      setHighlightedDates([...highlightedDates, selectedDate]);
    }
  };

  const toggleChecked = (index) => {
    const updatedItems = scheduleItems.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setScheduleItems(updatedItems);
    localStorage.setItem(selectedDate.toDateString(), JSON.stringify(updatedItems));
  };

  const handleDayClick = (value) => {
    setSelectedDate(value);
  };

  const startListening = () => {
    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && date.toDateString() === new Date().toDateString()) {
      return <div style={{ width: '100%', boxSizing: 'border-box' }}></div>;
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (highlightedDates.some(d => d.toDateString() === date.toDateString())) {
        return 'highlight';
      }
      if (date < new Date()) {
        return 'past-date';
      }
    }
    return null;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const todayDate = formatDate(new Date());

  return (
    <div className='Sche-body'>
      <h1 style={{ marginBottom: '50px' }}>나의 일정</h1>
      <div className="container">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={handleDayClick}
          className="custom-calendar"
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
        {selectedDate && (
          <div className="schedule-details">
            <h2 style={{ marginLeft: '15px' }}>{formatDate(selectedDate)}</h2>
            <div className="schedule-list">
              {scheduleItems.map((item, index) => (
                <div key={index} className={`schedule-item ${item.checked ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleChecked(index)}
                  />
                  <span className={item.checked ? 'checked' : ''}>{item.text}</span>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={newSchedule}
              onChange={handleInputChange}
              placeholder=" 계획을 직접 입력하거나 녹음해주세요."
            />
            <button onClick={listening ? stopListening : startListening}>
              {listening ? '녹음 중지' : '음성 녹음'}
            </button>
            <button onClick={addScheduleItem}>계획 추가하기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
