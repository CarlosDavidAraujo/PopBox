const express = require("express");
const fileControllers = require("../controllers/file");

const router = express.Router();

router.post("/upload", fileControllers.create);
router.get("/", fileControllers.findAll);
router.delete("/delete", fileControllers.delete);
router.put("/rename", fileControllers.rename);

module.exports = router;
