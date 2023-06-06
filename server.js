import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoutes.js';
import cors from 'cors';
import path from 'path'; //comes from Node
import {fileURLToPath} from 'url';
dotenv.config();

//rest object
const app = express();

//databse config
connectDB();

//es_module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);

//rest API
// app.get('/', (req, res) => {
//   res.send('<h1>Welcome to eCommerce App</h1>');
// });
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
