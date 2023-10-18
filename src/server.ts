import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.URLDBMONGO || "http://localhost:8000", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    } as ConnectOptions)
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

// API route for handling POST requests
app.post('/api/collect-data', async (req: Request, res: Response) => {
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
        res.status(500).json({ success: false, data: 'An error occurred' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
