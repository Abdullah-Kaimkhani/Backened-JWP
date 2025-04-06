import jwt from 'jsonwebtoken';

export const tokenVerification = async(req, res, next) => {
    try {
        if (req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded){
            next();
        } else {
            console.log("token unauthorised..")
        }
    } else {
        console.log("Token missing..")
    }
    } catch (error) {
        console.log(error)
    }
}