const express = require("express");
const fileControllers = require("../controllers/file");

const router = express.Router();

router.post("/upload", fileControllers.create);

module.exports = router;
