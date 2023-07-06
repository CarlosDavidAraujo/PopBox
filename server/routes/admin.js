const express = require("express")
const adminControllers = require("../controllers/admin")

const router = express.Router()

router.put("/edit-user", adminControllers.updateUser)
router.delete("/delete-user/:id", adminControllers.deleteUser)

module.exports = router
