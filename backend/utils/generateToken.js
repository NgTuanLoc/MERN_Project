import jwt from 'jsonwebtoken'

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_TOKEN, {
        expiresIn: "10d"
    })
}

export default generateToken