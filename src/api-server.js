import express from 'express';
import {setupRedis, redisClient} from './redis-client';

const app = express();
const port = process.env.PORT || 4000;

setupRedis();

app.get('/', (req, res) => {
	res.send('Hello React Class, from Express.js!');
});

app.get('/redis-test', (req, res)=>{
	redisClient.incr('inc-test1', (err, result)=>{
		if(err){
			console.error(err);
			res.send(err);
		} else{
			res.send(`New incremented value is : ${result}`);
		}
	});
});

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
});