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
            res.send({
                message: `Lỗi`,
                statusId: 'Server'
            })
        } else {
            res.send({
                message: `Thành công`,
                statusId: 'Server'
            })
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
    const findUser = await UserModel.findOne({ email });
    console.log(findUser)
    if (findUser) {
        return res.send({
            message: `Email ${email} đã tồn tại, vui lòng kiểm tra lại`,
            statusId: 'Existed email'
        })
    }
    else {
        const mycode = Math.floor(Math.random() * 100000);
        sendEmail(email, mycode, res);
        const user = await UserModel.create({ email, password: 'winter_' + mycode });
    }
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const findUsers = await UserModel.findOne({ email });
    console.log(findUsers)
    if (findUsers) {
        const findUser = findUsers.password === password;
        if (findUser) {
            if(findUsers.isActive) {
                res.send({
                    status: 'OK',
                    message : 'Đăng nhập thành công'
                })
            }
            else {
                res.send({
                    status: 'Fail1',
                    message : 'Tài khoản người dùng chưa được kích hoạt'
                })
            }
        }
        else {
            res.send({
                status: 'Fail2',
                message : 'Mật khẩu không khớp với tài khoản'
            })
        }
    }
    else {
        res.send({
            status: 'Fail3',
            message : 'Tài khoản chưa đăng ký'
        })
    }
})

app.post('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.send(users);
    } catch (error) {
        res.send(error)
    }
})


app.post('/user-active', async (req, res) => {
    try {
        const { id } = req.body;
        const users = await UserModel.findOne({ _id: id });
        if (!users) {
            return res.send({
                message: 'Không tìm thấy user !!'
            })
        }
        const activeUser = await UserModel.findByIdAndUpdate(id, {
            isActive: !users.isActive
        }, { new: true });
        res.send(activeUser);
    } catch (error) {
        res.send(error)
    }
})

app.post('/user-update', async (req, res) => {
    try {
        const { id } = req.body;
        const users = await UserModel.findOne({ _id: id });
        if (!users) {
            return res.send({
                message: 'Không tìm thấy user !!'
            })
        }
        const activeUser = await UserModel.findByIdAndUpdate(id, {
            ...req.body
        }, { new: true });
        res.send(activeUser);
    } catch (error) {
        res.send(error)
    }
})

