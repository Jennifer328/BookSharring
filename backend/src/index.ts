import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import { log } from 'console';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/api/test', async (req: Request, res: Response) =>{
  res.json({messages: 'api test is working'})
})

app.listen(7000, ()=>{
  console.log("server is running on port 7000");
  
})