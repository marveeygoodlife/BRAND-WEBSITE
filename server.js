const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()
const nodemailer = require("nodemailer");
const port = 6090;


/* create mail transporter */

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})
/* creat express app */
const app = express();

/* serve static html files from public folder */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

/* connect database */
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error', err));
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
    console.log('Received form data:', req.body);
    await user.save();
    console.log("Saved user", user)
    const mailoptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Enrollment Confirmation - MGL TECH HUB',
        html: `
        <h3> Hi ${firstname},</h3>
        <p>Thanks for enrolling in our program: <strong>${registerprogram}</strong>.</p>
        <p>We received your application and our team will contact you shortly</p>
        <p>Meanwhile, follow us on social media for updates.</p>
        <p>🌐 <a href="https://mgl-tech-hub.onrender.com/">Visit Website</a></p>
        <p>All social platforms: @mgltechhub</p>
        <p> Best regards, <br> MGL Tech HUb Team.❤️</p>
        `
    };
    try {
        await transporter.sendMail(mailoptions);
        console.log('Email sent to:', email);
        res.status(200).send("Saved and email sent");
    } catch (emailErr) {
        console.error("Email failed:", emailErr);
        res.status(500).send('Form saved but email failed.')
    }
    } catch (error) {
        console.error("Error saving to database", error);
        res.status(500).send("Internal server Error ");
    }
})


/* listen to port */
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})