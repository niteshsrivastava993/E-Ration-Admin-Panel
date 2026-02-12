const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const User = require('./models/User');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new Admin({
      username: 'admin',
      password: hashedPassword
    });
    await admin.save();

    // Create sample users
    const sampleUsers = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        address: '123 Main Street, Delhi',
        rationCardNumber: 'RC001',
        familyMembers: 4,
        rationQuota: { rice: 20, wheat: 12, sugar: 4 },
        issuedRation: { rice: 15, wheat: 8, sugar: 2 }
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543211',
        address: '456 Park Avenue, Mumbai',
        rationCardNumber: 'RC002',
        familyMembers: 2,
        rationQuota: { rice: 10, wheat: 6, sugar: 2 },
        issuedRation: { rice: 8, wheat: 4, sugar: 1 }
      },
      {
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '9876543212',
        address: '789 Gandhi Road, Pune',
        rationCardNumber: 'RC003',
        familyMembers: 5,
        rationQuota: { rice: 25, wheat: 15, sugar: 5 },
        issuedRation: { rice: 20, wheat: 10, sugar: 3 }
      },
      {
        name: 'Sunita Devi',
        email: 'sunita@example.com',
        phone: '9876543213',
        address: '321 Nehru Nagar, Kolkata',
        rationCardNumber: 'RC004',
        familyMembers: 3,
        rationQuota: { rice: 15, wheat: 9, sugar: 3 },
        issuedRation: { rice: 10, wheat: 6, sugar: 2 }
      }
    ];

    await User.insertMany(sampleUsers);

    console.log('✅ Sample data created successfully!');
    console.log('👤 Admin Login: username="admin", password="admin123"');
    console.log('📊 Sample users created with ration data');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();