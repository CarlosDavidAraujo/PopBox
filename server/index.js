const express = require('express');
const userRouter = require('./routes/user');
const cors = require("cors");
const path = require('path');
const app = express();
const port = 3002;

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/usuario', userRouter);
app.get('/', function (req, res) {
  res.send('Hello World!');
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
