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
    "ADD A SINGLE USER POST": "https://first-app-with-mongose-typescript.vercel.app/api/users",
    "FIND ALL USERS GET": "https://first-app-with-mongose-typescript.vercel.app/api/users",
    "FIND ONE USER GET": "https://first-app-with-mongose-typescript.vercel.app/api/users/{1}",
    "FIND ONE USER ALL ORDERS GET": "https://first-app-with-mongose-typescript.vercel.app/api/users/{1}/orders",
    "UPDATE ONE USER ORDERS PUT": "https://first-app-with-mongose-typescript.vercel.app/api/users/{1}/orders",
    "FIND ONE USER all orders total price GET": "https://first-app-with-mongose-typescript.vercel.app/api/users/{1}/orders/total-price",
    "UPDATE ONE USER PUT": "https://first-app-with-mongose-typescript.vercel.app/api/users/{1}",
    "DELETE ONE USER DELETE": "https://first-app-with-mongose-typescript.vercel.app/api/users/{1}",

  })
})
app.use('/api', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
