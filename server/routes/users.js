import express from 'express';
import bcrypt from 'bcryptjs';
import db  from '../models'; 

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    try {
        const { names, surnames, email, password } = req.body;
        const encryptedPassword = bcrypt.hashSync(password, 8);

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
// module.exports = router;


export default router;