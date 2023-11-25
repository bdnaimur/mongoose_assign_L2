import cors from 'cors';
import express, { Application, Request, Response } from 'express';
// import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.get('/', (req: Request, res: Response)=>{
  res.send({
    "Name": "Naimur"
  })
})
app.use('/api', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
