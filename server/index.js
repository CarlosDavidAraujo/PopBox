const express = require("express")
const cors = require("cors")
const multer = require("multer")
//const path = require("path");
const userRouter = require("./routes/user")
const adminRouter = require("./routes/admin")
const directoryRouter = require("./routes/directory")
const fileRouter = require("./routes/file")

const app = express()
const port = 3002
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//app.use(express.static(path.join(__dirname, "build")));
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/usuarios", userRouter)
app.use("/admin", adminRouter)
app.use("/diretorios", directoryRouter)
app.use("/arquivos", upload.single("file"), fileRouter)

/* app.get("/", function (req, res) {
  res.send("Hello World!");
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
