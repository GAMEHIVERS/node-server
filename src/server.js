const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific domains for more security.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// MongoDB Connection
mongoose
    .connect(process.env.URLDBMONGO || "http://localhost:8000", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
    .then((db) => {
        console.log("Database Connected Successfuly.");
    })
    .catch((err) => {
        console.log("Error Connectiong to the Database");
    });

// Define a MongoDB schema and model (adjust to your data structure)
const DataSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    teamformation: String,
    numofTeamMembers: String,
    role: String,
    nationality: String,
    workingidea: String,
    studioquestion: String,
    alreadystudioanswer: String,
    describeyou: String,
    teamoption: String,
    jobschedule: String,
    hearaboutus: String,
    shareanything: String,
    uploadvideo: String,
    jamattendance: String,
    CreatedAt: String,
    // Add other fields here
});

const DataModel = mongoose.model('Data', DataSchema);

const checkNul = ({ email,
    fullname,
    teamformation,
    numofTeamMembers,
    role,
    nationality,
    workingidea,
    studioquestion,
    alreadystudioanswer,
    describeyou,
    teamoption,
    jobschedule,
    shareanything,
    uploadvideo,
    jamattendance, }) => {

    if (fullname == '' ||
        teamformation == '' ||
        numofTeamMembers == '' ||
        role == '' ||
        nationality == '' ||
        workingidea == '' ||
        studioquestion == '' ||
        describeyou == '' ||
        teamoption == '' ||
        jobschedule == '' ||
        shareanything == '' ||
        uploadvideo == '' ||
        jamattendance == '') throw new Error("Some fields are empty, fill them up to register!")

}

// API route for handling POST requests
app.post('/api/collect-data', async (req, res) => {
    try {
        const {
            email,
            fullname,
            teamformation,
            numofTeamMembers,
            role,
            nationality,
            workingidea,
            studioquestion,
            alreadystudioanswer,
            describeyou,
            teamoption,
            jobschedule,
            hearaboutus,
            shareanything,
            uploadvideo,
            jamattendance,
            CreatedAt,

        } = req.body;
        console.log(req.body,"HULI")

        checkNul({
            email,
            fullname,
            teamformation,
            numofTeamMembers,
            role,
            nationality,
            workingidea,
            studioquestion,
            alreadystudioanswer,
            describeyou,
            jobschedule,
            shareanything,
            uploadvideo,
            jamattendance
        });


        const findResult = await  DataModel.find({email: email})
        console.log(findResult, "WIll")

        if(findResult) throw new Error("Email has been Registered, you will receive an email shortly!")

        const newData = new DataModel({
            email,
            fullname,
            teamformation,
            numofTeamMembers,
            role,
            nationality,
            workingidea,
            studioquestion,
            alreadystudioanswer,
            describeyou,
            teamoption,
            jobschedule,
            hearaboutus,
            shareanything,
            uploadvideo,
            jamattendance,
            CreatedAt,
        });

        await newData.save();
        res.json({ success: true, data: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, data: error.message || "An Error Occured" });
    }
});

app.get("/", (req, res) => {
    res.status(200).json({ "success": "Server is alive and kicking" })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
