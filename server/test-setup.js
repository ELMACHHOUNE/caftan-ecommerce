// Test script to verify server setup and basic functionality
const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔄 Testing database connection...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/caftan-ecommerce');
    console.log('✅ Database connected successfully');
    
    // Test basic operations
    const User = require('./models/User');
    
    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      console.log('👑 Creating authorized admin user...');
      const adminUser = new User({
        name: 'Aguizoul Admin',
        email: 'business.aguizoul@gmail.com',
        password: 'Admin123!',
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: business.aguizoul@gmail.com');
      console.log('🔑 Password: Admin123!');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
    // Test JWT token generation
    const testUser = await User.findOne({ role: 'admin' });
    const token = testUser.generateAuthToken();
    console.log('✅ JWT token generation test passed');
    
    console.log('\n🎉 Server setup verification completed successfully!');
    console.log('🚀 You can now start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Setup verification failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Make sure MongoDB is running locally');
      console.log('2. Check your MONGODB_URI in .env file');
      console.log('3. For MongoDB Atlas, verify your connection string');
    }
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

testConnection();