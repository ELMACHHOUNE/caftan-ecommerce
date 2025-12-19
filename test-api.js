const { default: fetch } = require('node-fetch')

const testAPI = async () => {
  try {
    // Test health endpoint
    console.log('Testing health endpoint...')
    const healthResponse = await fetch('http://localhost:5001/api/health')
    const healthData = await healthResponse.json()
    console.log('Health response:', healthData)
    
    // Test registration
    console.log('\nTesting registration...')
    const registerResponse = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword123'
      })
    })
    
    const registerData = await registerResponse.json()
    console.log('Register response status:', registerResponse.status)
    console.log('Register response:', registerData)
    
  } catch (error) {
    console.error('Error:', error)
  }
}

testAPI()