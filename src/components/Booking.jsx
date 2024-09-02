import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const device = params.get('device') || 'Unknown Device';
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (date instanceof Date) {
      fetchSlots(date);
    }
  }, [date]);

  const fetchSlots = async (selectedDate) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    const q = query(collection(db, 'slots'), where('date', '==', dateString));
    const querySnapshot = await getDocs(q);
    const slotsData = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!slotsData[dateString]) {
        slotsData[dateString] = [];
      }
      slotsData[dateString].push(data);
    });

    setSlots(slotsData);
  };

  const handleDateChange = (value) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      setDate(value[0]);
    }
  };

  const handleSlotBooking = async () => {
    if (!date || !(date instanceof Date) || !selectedSlot || !currentUser) return;

    const dateString = date.toISOString().split('T')[0];
    const userSlots = slots[dateString]?.filter(slot => slot.user === currentUser) || [];

    if (userSlots.length >= 2) {
      setNotification('You can only book 2 slots per day.');
      return;
    }

    if (slots[dateString] && slots[dateString].some(slot => slot.slot === selectedSlot)) {
      setNotification(`Slot ${selectedSlot} on ${date.toDateString()} is already booked.`);
      return;
    }

    if (window.confirm(`Are you sure you want to book ${selectedSlot} on ${date.toDateString()}?`)) {
      try {
        const slotRef = collection(db, 'slots');
        await addDoc(slotRef, {
          user: currentUser,
          date: dateString,
          slot: selectedSlot,
          device: device,
        });

        fetchSlots(date);
        setNotification(`Slot ${selectedSlot} on ${date.toDateString()} booked successfully!`);
      } catch (error) {
        setNotification(`Failed to book slot ${selectedSlot}. Please try again.`);
      }
    }
  };

  const getTileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    if (slots[dateString]) {
      return 'booked';
    }
    return '';
  };

  const generateHourlySlots = () => {
    if (!(date instanceof Date)) return [];

    const slotsArray = [];
    for (let i = 0; i < 24; i++) {
      const slotTime = new Date(date);
      slotTime.setHours(i, 0, 0, 0);
      const startTimeString = slotTime.toTimeString().split(' ')[0].substring(0, 5);
      slotTime.setHours(i + 1);
      const endTimeString = slotTime.toTimeString().split(' ')[0].substring(0, 5);
      slotsArray.push(`${startTimeString}-${endTimeString}`);
    }
    return slotsArray;
  };

  return (
    <div className="booking-container flex flex-col items-center">
      <h2 className="text-center mt-4 mb-10 text-4xl hover:text-5xl text-orange-500">
        Book a Slot for Experiment
      </h2>
      <div className="flex space-x-8">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={getTileClassName}
            className="shadow-lg rounded-lg"
          />
        </div>
        <div className="slots-container grid grid-cols-4 gap-0 justify-center">
          {generateHourlySlots().map((slot) => (
            <button
              key={slot}
              className={`p-2 border rounded-lg text-center ${
                selectedSlot === slot
                  ? 'bg-yellow-500 text-white'
                  : slots[date?.toISOString().split('T')[0]]?.some((s) => s.slot === slot)
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      {date instanceof Date && (
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSlotBooking}
          >
            Book Slot
          </button>
        </div>
      )}
      {notification && (
        <div className="mt-4 p-4 bg-yellow-200 text-yellow-800 rounded-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Booking;
