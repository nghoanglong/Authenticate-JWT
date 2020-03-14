const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const AuthController = require('./Controller/AuthController')
const AuthMiddleware = require('./Middleware/AuthMiddleware')
const data_user = require('./Models/users.api.json')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/login', AuthController.checkInputLogin) //check login, tạo token cho user
app.get('/api/users', AuthMiddleware.isAuth, function(req, res){
    //trả về api users
    res.status(200).json(data_user);
})

app.listen(5000, function(){
    console.log('app listen port 5000');
})