import { AppRouter } from '../../src/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';
import { useState } from 'react';
function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			url: 'http://localhost:3000/trpc'
		})
	);

	return (
		<trpc.Provider queryClient={queryClient} client={trpcClient}>
			<QueryClientProvider client={queryClient}>
				<AppContent />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

function AppContent() {
	const helloMessage = trpc.useQuery(['products']);
	const { data } = helloMessage;
	console.log(data);

	return (
		<>
			{data?.map(product => (
				<div key={product.id}>
					<h1>{product.name}</h1>
					<p>{product.description}</p>
					<small>{product.price}</small>
				</div>
			))}
		</>
	);
}

export default App;
