// const bcrypt = require('bcrypt');
// const user = require('../models/user')

// const createAdmin = async () => {
//   try {
//     const adminEmail = process.env.ADMIN_EMAIL;
//     const adminPassword = process.env.ADMIN_PASSWORD;

//     // Check if admin already exists
//     const adminExists = await user.findOne({ email: adminEmail });

//     if (adminExists) {
//       console.log('Admin already exists');
//       return;
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(adminPassword, 10);
//     // Create admin
//     await user.create({
//       email: adminEmail,
//       password: hashedPassword,
//     });

//     console.log('Admin user created successfully');
//   } catch (error) {
//     console.error('Admin creation failed:', error.message);
//   }
// };

// module.exports = createAdmin;
