// Simple test script to verify CORS is working
import fetch from 'node-fetch';

const testCors = async () => {
  try {
    const response = await fetch('https://videostreaming-s07g.onrender.com/api/test-cors', {
      method: 'GET',
      headers: {
        'Origin': 'https://video-streaming-three-rho.vercel.app',
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ CORS test successful:', data);
    } else {
      console.log('❌ CORS test failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ CORS test error:', error.message);
  }
};

testCors();
