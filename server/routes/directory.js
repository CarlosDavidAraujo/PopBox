const express = require("express");
const directoryControllers = require("../controllers/directory");

const router = express.Router();

router.post("/add", directoryControllers.create);
router.get("/:id", directoryControllers.findAll);
router.post("/rename", directoryControllers.rename);
router.delete("/delete", directoryControllers.delete);

module.exports = router;
