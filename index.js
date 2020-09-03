const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 9999;
const AppDB = require('./db');
var cors = require('cors');
var nodemailer = require('nodemailer');
const routers = require('./controller');
const category__router = require('./category_controller');
const UserModel = require('./user');


//Config mail 
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'nhattruong2513@gmail.com',
        pass: '123456zZ*'
    }
});

const sendEmail = (email, code, res) => {

    var mailOptions = {
        from: 'nhattruong2513@gmail.com',
        to: `nhattruong2513@gmail.com, ${email}`,
        subject: 'This is your password',
        text: 'winter_' + code
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            //   res.send(error)
        } else {
            res.send(info)
            //   console.log(info)
        }
    });
}


require('dotenv').config();
app.use(cors())

app.listen(PORT, () => console.log(" 🎉🎉🎉🎉 Server is running on port " + PORT));

app.use(bodyParser.json({ type: ["application/json", "application/x-www-form-urlencoded"] }));

AppDB(`mongodb+srv://adrian:25251325zZ*@cluster0.vwqd2.mongodb.net/test`);

routers(app);
category__router(app);

app.get("", (req, res, next) => {
    res.send(`
        <p>Hello from homeage 😍😍😍</p>
    `)
})

app.post('/signup', async (req, res) => {
    const { email } = req.body;
    const mycode = Math.floor(Math.random() * 100000);
    sendEmail(email, mycode, res);
    const user = await UserModel.create({ email, password: 'winter_' + mycode });
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const findUsers = await UserModel.findOne({ email });
    console.log(findUsers)
    const findUser = findUsers.password === password;
    if (findUser) {
        res.send({
            status: 'OK'
        })
    }
    else {
        res.send({
            status: 'Fail'
        })
    }
})