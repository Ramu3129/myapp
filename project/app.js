const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Mongoose Models for logging connections and receiving text
const ConnectionLog = mongoose.model('ConnectionLog', {
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
  ipAddress: String,
});

const TextInput = mongoose.model('TextInput', {
  text: String,
});

// Middleware to log requests
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Route to log frontend connections and insert into Mongoose Model
app.get('/', (req, res) => {
  const newConnection = new ConnectionLog({
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
  });
  newConnection.save();
  res.send('Welcome to the Express backend!');
});

// Route to receive text input and insert into Mongoose Model
app.post('/text-input', (req, res) => {
  const { text } = req.body;
  const newTextInput = new TextInput({
    text,
  });
  newTextInput.save();
  res.status(200).send('Text input received successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Express backend listening at http://localhost:${port}`);
});
