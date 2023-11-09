import express from 'express';
import { router as userRouter } from './routes';

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  console.log('Hello World');
  res.send('Hello World');
});

app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
