const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()

const port = 6090;

/* creat express app */
const app = express();

/* serve static html files from public folder */
app.use(express.static(__dirname, 'public'));
app.use(express.urlencoded({extended: true}));

/* connect database */
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.once("open", ()=>{
    console.log("DATABASE CONNECTION SUCCESSFUL");
});

/* create user schema */

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
   telephone :Number,
   occupation: String,
   companyname: String,
   role: String,
   jobyears: String,
   internshipduration: String,
   startDate:Date,
   registerprogram: String,
   country: String,
   knowus: String,
   terms: Boolean
});
const newUsers = mongoose.model("data", userSchema);

/* get static files to serve as webpage */
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "course.html"));
 })

/* send user data input to database */

app.post("/post", async(req, res)=>{
    const  { firstname, lastname, 
         email, telephone, occupation, companyname, role, jobyears, internshipduration, startDate, registerprogram, country, knowus, terms
    } = req.body;
console.log("Request body", req.body);
console.log("Telephone", typeof telephone)
console.log("date ", Date, "=>", new Date(startDate))

    try {
        const user = new newUsers({
        firstname,
        lastname, 
        email, 
        telephone:Number(telephone),
        occupation, 
        companyname,
        role,
        jobyears,
        internshipduration, 
        startDate: new Date(startDate), 
        registerprogram, 
        country,
        knowus, 
        terms : terms === "on" || terms === true
    }); 
    await user.save();
    console.log("Saved user", user)
    res.send("Form submitted, check database")
    } catch (error) {
        console.error("Error saving to database", error);
        res.status(500).send("Failed to save");
    }
})


/* listen to port */
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})