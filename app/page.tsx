export const revalidate = 0;
import Container from './components/Container';
import HomeBanner from './components/HomeBanner';
import ProductCard from './components/products/ProductCard';
import getProducts, { IProductsParams } from '@/actions/getProducts';
import NullData from '@/app/components/NullData';

interface HomeProps {
	searchParams: IProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
	const products = await getProducts(searchParams);
	if (!products || products.length === 0) {
		return (
			<NullData title='Oops! No products found. Click "All" to clear filters' />
		);
	}

	const shuffleArray = (array: any) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const shuffleProducts = shuffleArray(products);

	return (
		<div className='p-8'>
			<Container>
				<div>
					<HomeBanner />
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
					{shuffleProducts.map((product: any) => {
						return <ProductCard key={product.id} data={product} />;
					})}
				</div>
			</Container>
		</div>
	);
}
