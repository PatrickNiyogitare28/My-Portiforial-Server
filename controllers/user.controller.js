let {UniqueId } = require('../utils/uniqueId');
const hashPassword  = require('../utils/hassPassword');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const {User} = require('../modals/users.modal');
const getCurrentDate = require('../utils/date');
const jwtSigner = require('../utils/jwtSigner');

exports.createAccount = async (req,res) =>{
  let user=await User.findOne({email:req.body.email})
    if(user) return res.send('User already registered').status(400)

    user =new User(_.pick(req.body,['name','email','password']))
    const harshed = await hashPassword(user.password)
    user.password = harshed;
    user.role = 'STANDARD_USER',
    user.createdDate = await getCurrentDate();
    await user.save();
    return res.send({
        succcess: true,
        message: 'User created',
        status: 201,
        user:  _.pick(user,['_id','name','email','createdDate','role'])

       }).status(201)
}

exports.login = async(req,res)=>{
 let user = await User.findOne({email: req.body.email});
    console.log(user)
    if(!user){
        return res.send({
            success: false,
            status: 401,
            message: "Invalid Email or Password"
        }).status(401)
    }

    let validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.send({
            success: false,
            status: 401,
            message: "Invalid Email or Password"
        }).status(401)
    }
    let currentUser = _.pick(user,['_id','name','email','role'])
    return res.send({
        success: true,
        status: 200,
        user: currentUser,
        token: await jwtSigner(currentUser)

    })
 }

exports.getUsers = async(req,res) =>{
      await User.find().then((users)=>{
          res.send({success: true, status: 200, users: users}).status(200);
      })
}

