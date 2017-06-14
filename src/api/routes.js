import express from 'express';
import { redisClient } from './redis-client';
import { UserValidator } from '../core/user-validator';
import jwt from 'jsonwebtoken';

var router = express.Router();

const secret = 'xiaohu-chowhua-cutest';

function setupRoutes(app) {
	app.get('/', (req, res) => {
		res.send('Hello React Class, from Express.js!');
	});

	app.get('/redis-test', (req, res) => {
		redisClient.incr('inc-test1', (err, result) => {
			if (err) {
				console.error(err);
				res.send(err);
			} else {
				res.send(`New incremented value is : ${result}`);
			}
		});
	});

	app.get('/json-test', (req, res) => {
		redisClient.incr('json-test', (err, result) => {
			if (err) {
				console.error(err);
				res.send(err);
			} else {
				res.json({
					incResult: result
				});
			}
		});
	});

	app.post('/user', (req, res, next) => {
		const { handle, name } = req.body;
		const user = { handle, name };

		console.log(user);

		const validator = new UserValidator(user);
		const validationErrors = validator.validate([]);

		if (validationErrors.length > 0) {
			console.log(`validation errors: ${validationErrors}`);
			res.status(500).send(validationErrors);
			return; 
		}

		redisClient.lpush('users|v1', JSON.stringify(user), (err, result) => {
			if (err)
				next(err);
			else{
				let token = jwt.sign({handle}, secret);
				res.json({token: token});
			}
		});
	});

	app.get('/user/verify', (req, res)=>{
		const clientToken = req.header('Authorization');

		const decoded = jwt.decode(clientToken, secret);

		res.send(decoded.handle);
	});
}

export { setupRoutes };