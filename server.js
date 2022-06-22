const express  = require("express");
const connectDB = require("./config/connectDB");
const user = require("./routes/user")

let app = express()
app.use(express.json())
const PORT =process.env.PORT || 5000;
connectDB()

app.use("/user",user)


app.listen(PORT,err=>err?console.log(err):console.log(`server is running on port ${PORT}`))