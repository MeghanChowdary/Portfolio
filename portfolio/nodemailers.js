const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('portfolio'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.use('/portfolio/Style.css', (req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});


app.post('/send-email', (req, res) => {
    const { clientname, clientemail, clientphone, clientsuggestions, isclient } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'meghanchowdary89@gmail.com',
            pass: 'baxa ulch nxnx eysb'
        }
    });

    let mailOptions = {
        from: 'meghanchowdary89@gmail.com',
        to: clientemail,
        subject: 'Welcome to Our Website!',
        text: `
            Name: ${clientname}\n
            Email: ${clientemail}\n
            Phone: ${clientphone}\n
            Suggestions: ${clientsuggestions}\n
            Hiring: ${isclient ? 'Yes' : 'No'}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            alert('E-Mail Not Sent');
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            alert('E-Mail Sent');
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
