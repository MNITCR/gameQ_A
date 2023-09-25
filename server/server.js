const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/gameJS');

// Routes for signup and login
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email})
  .then(user => {
    if (user){
      if(user.password === password){
        res.json("Success");
      }else{
        res.json("Error");
      }
    }else{
      res.json("The user does not exist");
    }
  });

});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if a user with the same name or email already exists
    const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User with the same name or email already exists' });
    }

    // If no existing user, create a new user
    const user = await UserModel.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
