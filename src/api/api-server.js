import express from 'express';
import cors from 'cors';
import {setupRoutes} from './routes';
import {setupRedis} from './redis-client';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

setupRedis();
setupRoutes(app);

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
});