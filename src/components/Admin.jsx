import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchUsersAndSlots = async () => {
      setLoading(true);
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const slotsSnapshot = await getDocs(collection(db, 'slots'));

      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const slotsList = slotsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersList);
      setSlots(slotsList);
      setLoading(false);
    };

    fetchUsersAndSlots();
  }, []);

  const handleApproval = async (userId, approve) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { approved: approve });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, approved: approve } : user
        )
      );
      setNotification(approve ? 'User approved successfully!' : 'User disapproved.');
    } catch (error) {
      setNotification('Failed to update user approval status.');
    }
  };

  const handleUserRemoval = async (userId) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      try {
        const userRef = doc(db, 'users', userId);
        await deleteDoc(userRef);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setNotification('User removed successfully!');
      } catch (error) {
        setNotification('Failed to remove user.');
      }
    }
  };

  const filteredSlots = selectedDate
    ? slots.filter((slot) => new Date(slot.date).toDateString() === selectedDate.toDateString())
    : slots;

  const totalUsers = users.length;
  const approvedUsers = users.filter(user => user.approved).length;
  const disapprovedUsers = totalUsers - approvedUsers;

  return (
    <div className="admin-container flex flex-col items-center p-4">
      <h2 className="text-center mt-4 mb-6 text-4xl text-orange-500">
        Admin Dashboard
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="stats-section p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl mb-4">User Statistics</h3>
            <p>Total Users: {totalUsers}</p>
            <p>Approved Users: {approvedUsers}</p>
            <p>Disapproved Users: {disapprovedUsers}</p>
          </div>          

          <div className="users-section p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl mb-4">Manage Users</h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">
                      {user.approved ? 'Approved' : 'Not Approved'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                        onClick={() => handleApproval(user.id, true)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleApproval(user.id, false)}
                      >
                        Disapprove
                      </button>
                      <button
                        className="bg-red-500 text-white px-5 py-1 rounded"
                        onClick={() => handleUserRemoval(user.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="calendar-section p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl mb-4">Choose Date to see Bookings</h3>
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate} 
              className="mx-auto"
            />
          </div>

          <div className="slots-section p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl mb-4">Booked Slots</h3>
            <table className="min-w-full bg-white border border-gray-200 ">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">User</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Slot</th>
                  <th className="py-2 px-4 border-b">Device</th>
                </tr>
              </thead>
              <tbody>
                {filteredSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td className="py-2 px-4 border-b">{slot.user}</td>
                    <td className="py-2 px-4 border-b">{slot.date}</td>
                    <td className="py-2 px-4 border-b">{slot.slot}</td>
                    <td className="py-2 px-4 border-b">{slot.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {notification && (
            <div className="col-span-2 mt-4 p-4 bg-yellow-200 text-yellow-800 rounded-lg">
              {notification}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
