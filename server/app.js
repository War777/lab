import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import productsRouter from './routes/products';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config/contants';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
app.use('/', expressJwt({
    secret: JWT_SECRET,
    algorithms: ['RS256'],
}).unless({
    path: [
        {
            url: /users\/unprotected\/.*/,
            methods: ['POST', 'GET'],
        },
        {
            url: '/users/signup',
            methods: ['POST'],
        },{
            url: '/users/create',
            methods: ['POST'],
        },
    ],
}));
app.use('/users', usersRouter);
app.use('/products', productsRouter);

export default app;
