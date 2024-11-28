import OrderDetails from './OrderDetails';
import Container from '@/app/components/Container';
import getOrderById from '@/actions/getOrderById';
import NullData from '@/app/components/NullData';

interface IPrams {
	orderId?: string;
}

const Order = async ({ params }: { params: IPrams }) => {
	const order = await getOrderById({ orderId: params.orderId });

	if (!order) {
		return <NullData title='No Order found' />;
	}

	return (
		<div className='p-8'>
			<Container>
				<OrderDetails order={order} />
			</Container>
		</div>
	);
};
export default Order;
