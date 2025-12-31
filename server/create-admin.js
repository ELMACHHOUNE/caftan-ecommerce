// Script to create a custom admin user
const mongoose = require('mongoose');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    console.log('🔄 Connecting to database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Database connected successfully');
    
    const User = require('./models/User');
    
    // Prompt for admin details (you can modify these)
    const adminEmail = 'admin@example.com'; // Change this to your preferred email
    const adminPassword = 'admin123'; // Change this to your preferred password
    const adminName = 'Custom Admin';
    
    // Check if admin user already exists with this email
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log(`ℹ️  Admin user with email ${adminEmail} already exists`);
      console.log(`📧 Email: ${existingAdmin.email}`);
      console.log(`👑 Role: ${existingAdmin.role}`);
    } else {
      console.log(`👑 Creating admin user with email: ${adminEmail}`);
      const adminUser = new User({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
      
      console.log('\n⚠️  IMPORTANT: Add this email to the authorizedAdmins array in AdminRoute component:');
      console.log(`'${adminEmail}'`);
    }
    
    console.log('\n🎉 Admin user setup completed!');
    
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Run the script
createAdminUser();