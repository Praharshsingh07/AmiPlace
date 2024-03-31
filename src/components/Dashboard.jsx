import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
    return (
      <>
        <div className="flex flex-col items-center justify-between min-h-screen">
          <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
          <p className="mb-8">This is a protected area only accessible to authenticated users. Update the dashboard here.</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <Footer /> {/* Include Footer component */}
      </>
    );
};

export default Dashboard;