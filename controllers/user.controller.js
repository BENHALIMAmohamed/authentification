const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('config')
const secret = config.get("secret")



exports.register = async(req,res)=>{
    const {fullName,email,password,phone}= req.body
  
    try {
        const existantUser = await User.findOne({email})
        if (existantUser) 
            
            return res.status(406).json({msg:"user already exists!"})
        
        const newUser = new User({
            fullName,
            email,
            password,
            phone
        })
const salt =await bcrypt.genSalt(10);
const hash =await bcrypt.hash(password, salt);
newUser.password = hash
        await newUser.save()
const payload = {
    id:newUser._id
}
const token  = jwt.sign(payload,secret)
res.send({
    token,
    user:{
        id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email
    }
})
    } catch (error) {
        res.status(500).json({errors:error.message})
    }
}

// verify password
exports.login = async(req,res)=> {
    const {email,password}= req.body
    try {
        const user = await User.findOne({email})
        console.log(user)
        if(!user) return res.status(401).json({msg:"Email or passowrd incorrect!"})
        const verifiedUser = await bcrypt.compare(password,user.password)
        if(!verifiedUser) return res.status(401).json({msg:"Email or passowrd incorrect!"})
        const payload = {
            id:user._id
        }
        const token  = jwt.sign(payload,secret)
        res.send({
            token,
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                phone:user.phone
            }
        })

    } catch (error) {
        res.status(500).json({errors:error.message})
    }
}

exports.authorizedUser = (req,res) => {
    res.send(req.user)
}