import { product } from '../../utils/product';
import ProductDetail from './ProductDetail';
import Container from '@/app/components/Container';
import ListRating from './ListRating';

interface IPrams {
	productId?: string;
}

const Product = ({ params }: { params: IPrams }) => {
	console.log(params);
	return (
		<div className='p-8'>
			<Container>
				<ProductDetail product={ product } />
				<div className='flex flex-col mt-20 gap-4'>
					<div>add rating</div>
					<ListRating product={ product } />
				</div>
			</Container>
		</div>
	);
};
export default Product;
