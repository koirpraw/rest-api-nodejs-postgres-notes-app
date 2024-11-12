const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Auth = require('../model/authModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';



const register = async (req, res) => {

    try {
        const { email, password, role } = req.body;
        const user = await Auth.createNewUser({ email, password, role });
        res.status(201).json({
            message: `${user.role} with email ${email} succesfully created`,
            user: { id: user.id, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering new user', error: error })

    }

}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await Auth.findUserByEmail(email);
        if (!user) {
            res.status(401).json({ message: 'Invalid user email' })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password !' })
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Login Succesful',
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error Loggin in', error: error })

    }

}



// const logout = () => {

// }

module.exports = { register, login }