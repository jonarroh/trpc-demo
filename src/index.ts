import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from 'zod';
const app = express();

const products = [
	{
		id: 1,
		name: 'product 1',
		price: 100,
		description: 'description 1'
	},
	{
		id: 2,
		name: 'product 2',
		price: 200,
		description: 'description 2'
	}
];

const appRouter = trpc
	.router()
	.query('hello', {
		resolve() {
			return 'hello world with trpc 2';
		}
	})
	.query('products', {
		resolve() {
			return products;
		}
	})
	.mutation('createProduct', {
		input: z.string(),
		resolve({ input }) {
			products.push({
				id: products.length + 1,
				name: input,
				price: 0,
				description: ''
			});
			return 'product created';
		}
	});

export type AppRouter = typeof appRouter;
app.use(cors());
app.use(
	'/trpc',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext: () => null
	})
);
app.listen(3000);
console.log('listening on port 3000 si');
