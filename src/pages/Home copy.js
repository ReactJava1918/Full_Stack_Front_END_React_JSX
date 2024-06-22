import React, { useState, useEffect } from 'react';
import { getUser } from '../api/apiRequest';

function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser();
        
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      <header>
        <h1>Welcome {userData ? userData.email : ''}</h1>
      </header>
      <main>
        <section>
          <h2>About Us</h2>
          <p>We are a team dedicated to creating awesome React.js applications.</p>
        </section>
        <section>
          <h2>Services</h2>
          <p>Our services include web development, mobile app development, and consulting.</p>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>Email: contact@example.com</p>
          <p>Phone: 123-456-7890</p>
        </section>
      </main>
    </div>
  );
}

export default Home;
