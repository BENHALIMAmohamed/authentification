const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const secret = config.get('secret')



const auth = async(req,res,next)=> {
    const token = req.headers.authorization
    if(!token) return res.status(401).json({msg:"not authorized"})
    try {
        const decoded = await jwt.verify(token,secret)
        if (!decoded) res.sattus(401).json({msg:"invalid token"})
        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            res.status(401).json({msg:"user not found"})
        }else {
            req.user=user;
            next()
        }
    } catch (error) {
        res.status(500).json({errors:error.message})
    }
}

module.exports = auth

