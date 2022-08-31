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
	const [newProduct, setNewProduct] = useState('');
	const helloMessage = trpc.useQuery(['products']);
	const addProduct = trpc.useMutation(['createProduct']);
	const client = trpc.useContext();

	if (helloMessage.isLoading) {
		return <div>Loading...</div>;
	}
	if (helloMessage.isError) {
		return <div>Error</div>;
	}

	const { data } = helloMessage;

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					addProduct.mutate(newProduct, {
						onSuccess(value) {
							client.invalidateQueries(['products']);
						}
					});
				}}>
				<input
					type="text"
					value={newProduct}
					onChange={e => setNewProduct(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<div>
				{data?.map(product => (
					<div key={product.id}>
						<h1>{product.name}</h1>
						<p>{product.description}</p>
						<small>{product.price}</small>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
