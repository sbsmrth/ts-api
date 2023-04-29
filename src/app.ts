import express, { Application, Request, Response } from 'express'
import { UsersController } from './controllers/users.controller';

export class App {
    private port: number;
    private app: Application;
    private userController: UsersController;

    constructor(port: number = 3000) {
        this.port = port;
        this.app = express();
        this.config();
        this.userController = new UsersController();
        this.registerRoutes();
    }

    private config() {
        this.app.use(express.json());
    }

    private registerRoutes() {
        this.app.get('/', (req: Request, res: Response) => {
            return res.json({ ip: req.ip });
        });
        
        this.app.get('/users', (req: Request, res: Response) => {
            const users = this.userController.findAll();
            return res.json(users);

        });

        this.app.get('/users/:userId', (req: Request, res: Response) => {
            const user = this.userController.findOne(req.params.userId);
            
            if (user) {
                return res.json(user);
            }
            
            return res.status(404).json({ message: 'User not found' });
        });

        this.app.post('/users', (req: Request, res: Response) => {
            const newUser = this.userController.create(req.body);
            return res.status(201).json({ message: 'User created', user: newUser });
        });

        this.app.put('/users/:userId', (req: Request, res: Response) => {
            const updated_user = this.userController.update(req.params.userId, req.body);
            
            if (updated_user) {
                return res.status(200).json({ message: 'ok', updated_user});
            }

            return res.status(404).json({ message: 'User not found' });
        });

        this.app.delete('/users/:userId', (req: Request, res: Response) => {
            const user = this.userController.delete(req.params.userId);
            
            if (user) {
                return res.status(200).json({ message: 'ok'});
            }

            return res.status(404).json({ message: 'User not found' });
        });
    }

    public async listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}