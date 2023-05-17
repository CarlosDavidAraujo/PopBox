const express = require('express');
const userRouter = require('./routes/user');
const cors = require("cors");

const app = express();
const port = 3002;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/usuario', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
