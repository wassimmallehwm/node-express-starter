const jwtService = require('../token/jwt.service');
const jwt = require('jsonwebtoken')

const authenticated = (req, res, next) => {
    try{
        const token = req.header("x-auth-token");
        if(!token){
            return res.status(401).json({msg : "Not Authorized !"})
        }
        const verified = jwtService.verify(token);
        if(!verified){
            return res.status(401).json({msg : "Not Authorized !"})
        }
        const { _id, role } = verified
        req.user = { _id, role };
        next();
    } catch(e){
        if(e instanceof jwt.TokenExpiredError){
            return res.status(401).json({message : "token_expired"})
        } else {
            res.status(500).json({message: "server error"});
        }
    }
}

const admin = async (req, res, next) => {
    try{
        if(req.user.role.label !== 'ADMIN'){
            return res.status(403).json({msg : "Permission denied"})
        }
        next();
    } catch(e){
        res.status(500).json({message: "server error"});
    }
}

module.exports = {
    authenticated,
    admin
}