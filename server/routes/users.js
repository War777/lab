import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db, {
    models,
} from '../models';
import {
    BCRYPT_SALT_NUMBER,
    JWT_SECRET,
} from '../config/contants.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    try {
        const { names, surnames, email, password } = req.body;
        const encryptedPassword = bcrypt.hashSync(password, BCRYPT_SALT_NUMBER);

        const userData = {
            names,
            surnames,
            email,
            password: encryptedPassword
        }
        // console.log('USER DATA', userData);
        const instance = await db.sequelize.models.user.create(userData);
        console.log('instance', instance);
        res.json({ instance });
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ error });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const {
            body: {
                names,
                surnames,
                email,
                password,
                passwordConfirm,
            },
        } = req;
    
        const isThereEnoughInfo = email && password && passwordConfirm;
    
        if (!isThereEnoughInfo) {
            res.status(400).send({ message: 'There\'s no enough info' });
        }
    
        const user = await models.user.findOne({
            where: {
                email: {
                    [db.Sequelize.Op.like]: email,
                },
            },
            raw: true,
        });
    
        if (user) {
            return res.status(400).send({ message: 'Email already exists' });
        } else if (password !== passwordConfirm) {
            return res.status(400).send({ message: 'Passwords don\'t match' });
        } else {
            const newUserData = {
                names,
                surnames,
                email,
                password: bcrypt.hashSync(password, BCRYPT_SALT_NUMBER),
            };
    
            const newUserInstance = await models.user.create(newUserData);
    
            const newUserVisibleData = {
                id: a.id,
                names: newUserInstance.names,
                surnames: newUserInstance.surnames,
                email: newUserInstance.email,
            };
    
            const token = jwt.sign({ user: newUserVisibleData }, JWT_SECRET);
    
            return res.status(200).send({
                message: 'Account created',
                token,
                user: newUserVisibleData,
            });
        }
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
});

router.get('/unprotected/:someparam', (req, res) => {
    const {
        params: {
            someparam,
        }
    } = req;
    console.log('\x1b[36m', 'someparam', someparam, '\x1b[0m');
    res
        .status(200)
        .send({
            message: 'GET, this route was unprotected',
            someparam,
        });
});

router.post('/unprotected/:someparam', (req, res) => {
    res
        .status(200)
        .send({
            message: 'POST, this route was unprotected, cool',
        });
});

export default router;
