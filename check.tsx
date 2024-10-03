const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();

const users = [
    { id: 1, username: 'testuser', password: '$2b$10$EIXy3R8u2R1WwQ9z5y0D8eZxkH5b6B3M4P2q8OZ7pG0F1M7D5P0eK' }, // Password is "password"
  ];
  


  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});



const { chromium } = require('playwright');