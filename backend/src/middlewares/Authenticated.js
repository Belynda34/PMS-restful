const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = authHeader.split(" ")[1];
    if(!accessToken){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET)
        console.log("Authorization Header:", req.headers.authorization);
        req.user = decodedToken
        next()

    } catch (error) {
        console.log("Error with:",error.message)
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = { isAuthenticated } 




