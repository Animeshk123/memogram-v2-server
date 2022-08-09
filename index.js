import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import route from './routes/route.js';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT || "8080";
const DBURL = process.env.DBURL;

app.use(cors({
  origin:"*"
}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/v1",route);

mongoose.connect(DBURL).then(() => {
app.listen(PORT,() => console.log(`our server is running on port ${PORT}`));  
}).catch(err => console.log(err));
