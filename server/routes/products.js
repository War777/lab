import express from 'express';
import db from '../models';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('getting products :v');
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const { description, price } = req.body;
        const productData = {
            description,
            price,
        }
        console.clear();
        console.log('productData', productData);
        // console.log('user', db.sequelize.models.user);
        const instance = await db.sequelize.models.product.create(productData); 
        console.log('instance', instance);
        res.json({ instance });
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ error });
    }
    
});
// module.exports = router;
export default router;