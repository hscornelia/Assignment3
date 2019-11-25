import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { User } from './entity/user.entity';

createConnection().then(connection => {
    const userRepository = connection.getRepository(User);

    const app = express();
    const port = 3000;
    var cors = require('cors')

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

    app.get('/', function(req: Request, res: Response) {
        return res.send("hello world!");
    });
    
    app.get('/users', async function (req: Request, res: Response) {
        const users = await userRepository.find();
        res.cookie('name', 'chuls cookie').json(users);
    });

    app.get('/users/:id', async function (req: Request, res: Response) {
        const results = await userRepository.findOne(req.params.id);
        res.cookie('name', 'chuls cookie').json(results);
        //return res.send(results);
    });

    app.post('/users/:id', async function (req: Request, res: Response) {
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.put('/users/:id', async function (req: Request, res: Response) {
        const user = await userRepository.findOne(req.params.id);
        userRepository.merge(user, req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.delete('/users/:id', async function (req: Request, res: Response) {
        const results = await userRepository.delete(req.params.id);
        return res.send(results);
    });

    // app is running in port 3000;
    app.listen(port);
})
