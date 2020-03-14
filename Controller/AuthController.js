const jwtAuth = require('../Middleware/jwt.authenticate');
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h"; //thời gian sống của token là 1 hour
const accessTokenSecret = process.env.TOKEN_SECRET || "access-token-secret-hoanglong/backend";//trong project thực tế thì token secret nên ở dạng env

//login user and set token cho user
let checkInputLogin = async(req, res, next) => {
    try{
        const user_email = req.body.email;
        const user_pwd = req.body.password;
        if(user_email !== 'hoanglong.backend@gmail.com' || user_pwd !== '1234567'){
            throw new Error('invalid infor')
        }
        const payload = {
            id: '1827364423249834234', //mình cho đại id
            name: 'Hoang Long',
            email: 'hoanglong.backend@gmail.com',
        }
        const accessToken = await jwtAuth.generateToken(payload, accessTokenSecret, accessTokenLife);
        res.cookie('access_token', accessToken, {
            maxAge: 365 * 24 * 60 * 60 * 100,
            httpOnly: true
            //secure: true; //chạy localhost thì k cần bật
        })
        res.status(200).json({"msg": 'success login'});
    }catch(err){
        console.log(err);
        return res.status(400).json({"msg": "Invalid info"});;
    }
}


module.exports = {
    checkInputLogin: checkInputLogin
}
