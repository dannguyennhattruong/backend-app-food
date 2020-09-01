const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 9999;
const AppDB = require('./db');
var cors = require('cors')
const routers = require('./controller');
const category__router = require('./category_controller');

require('dotenv').config();
app.use(cors())

app.listen(PORT,() => console.log(" 🎉🎉🎉🎉 Server is running on port " + PORT ));

app.use(bodyParser.json({type: ["application/json","application/x-www-form-urlencoded"]}));

AppDB(`mongodb+srv://adrian:25251325zZ*@cluster0.vwqd2.mongodb.net/test`);

routers(app);
category__router(app);

app.get("", (req,res,next) => {
    res.send(`
        <p>Hello from homeage 😍😍😍</p>
    `)
})