import supertest from "supertest";
// import { Express } from 'express';
import router from '../src/routes/routes';

// let app: Express;
const app = router;

describe('GET /search ', () => {
	beforeEach(async () => {
		// const 
	});

	afterEach(async () => {
	});
	it ('should return an array of tv show results', async () => {
		return supertest(app)
			.get('/api/shows/search')
			.query({ show: 'superman' })
			.expect(200)
			// .expect('Content-Type', 'application/json')
			/*.then((response) => {

			});*/
	});
});