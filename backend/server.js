const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://yatharthpatel014:yatharth@cluster0.iq2m5.mongodb.net/ResumeData?retryWrites=true&w=majority';


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ResumeData'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    fullName: String,
    email: String,
    pass: String,
});

const resumeSchema = new mongoose.Schema({
    fullName: String,
    dept: String,
    phone: String,
    email: String,
    gitlink: String,
    summary: String,
    graduationInstitute: String,
    graduationQualification: String,
    graduationYear: String,
    twelfthInstitute: String,
    twelfthQualification: String,
    twelfthYear: String,
    skillsFE: String,
    skillsBE: String,
    skillsOther: String,
    lang1: String,
    lang2: String,
    lang3: String,
    project1: String,
    project2: String,
    project3: String,
    projectdes1: String,
    projectdes2: String,
    projectdes3: String,
    choosecolor: String,
});

const Resume = mongoose.model('resumedetails', resumeSchema);


const UserData = mongoose.model('registerdetails', userDataSchema); 

app.post('/api/register', async (req, res) => {
    const { fullName, email, pass } = req.body;

    try {
        const newUser = new UserData({ fullName, email, pass });

        const savedUser = await newUser.save();
        
        res.json(savedUser);
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Error saving user');
    }
});

app.post('/api/login', async (req, res) => {
    const { fullName, pass, email } = req.body;

    try {
        const userData = await UserData.findOne({ email });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (userData.fullName !== fullName || userData.pass !== pass || userData.email !== email) {
            return res.status(400).json({ message: 'Invalid credentials' }); 
        }

        const { fullName: userFullName, email: userEmail } = userData;
        res.json({ fullName: userFullName, email: userEmail });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).send('Server error');
    }
});

// app.post('/api/resume', async (req, res) => {
//     try {
//         const resumeData = req.body;

//         const newResume = new Resume(resumeData);

//         const savedResume = await newResume.save();

//         res.json(savedResume);
//     } catch (err) {
//         console.error('Error saving resume:', err);
//         res.status(500).send('Error saving resume');
//     }
// });

app.get('/api/resumeData', async (req, res) => {
    try {
        const { email } = req.query;
        const query = email ? { email } : {};
        const resumeData = await Resume.find(query);
        res.send(resumeData);
    } catch (err) {
        console.error('Error fetching resume data:', err);
        res.status(500).send('Error fetching resume data');
    }
});

app.get('/api/search', async (req, res) => {
    try {
        const { email, fullName } = req.query;
        const query = { email, fullName };

        if (!email || !fullName) {
            return res.status(400).send('Both email and fullName are required');
        }

        const resumeData = await Resume.findOne(query);

        if (!resumeData) {
            return res.status(404).json({ message: 'No resume found for the given user' });
        }

        res.json(resumeData);
    } catch (err) {
        console.error('Error fetching resume data:', err);
        res.status(500).send('Error fetching resume data');
    }
});

app.put('/api/resume', async (req, res) => {
    const { email, fullName, ...updateData } = req.body; // Destructure the request body

    try {
        // First, try to find and update the existing resume
        const updatedResume = await Resume.findOneAndUpdate(
            { email, fullName }, // Query to find the document
            updateData, // Data to update
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        // If no resume was found, create a new one
        if (!updatedResume) {
            const newResume = new Resume({
                email,
                fullName,
                ...updateData // Include all other data
            });

            const savedResume = await newResume.save(); // Save the new resume
            return res.status(201).json(savedResume); // Respond with the newly created resume
        }

        res.json(updatedResume); // Respond with the updated document
    } catch (err) {
        console.error('Error updating or creating resume:', err);
        res.status(500).send('Error updating or creating resume');
    }
});





app.delete('/api/delete', async (req, res) => {
    const { email, fullName } = req.body;

    try {
        const deletedResume = await Resume.findOneAndDelete({ email, fullName });

        if (!deletedResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json({ message: 'Resume deleted successfully', deletedResume });
    } catch (err) {
        console.error('Error deleting resume:', err);
        res.status(500).send('Error deleting resume');
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
