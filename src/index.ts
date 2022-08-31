import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
const app = express();
const appRouter = trpc
	.router()
	.query('hello', {
		resolve() {
			return 'hello world with trpc 2';
		}
	})
	.query('products', {
		resolve() {
			return [
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
