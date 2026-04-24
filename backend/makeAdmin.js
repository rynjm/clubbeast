require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const emailToPromote = process.argv[2];

if (!emailToPromote) {
  console.log("Please provide an email address. Example: node makeAdmin.js your@email.com");
  process.exit(1);
}

// Use the local .env MONGO_URI, which connects to your remote MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findOneAndUpdate(
      { email: emailToPromote }, 
      { role: "admin" }, 
      { new: true }
    );
    
    if (user) {
      console.log(`Success! The account ${user.email} is now an admin.`);
    } else {
      console.log(`User with email ${emailToPromote} was not found. Please check the spelling.`);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });
