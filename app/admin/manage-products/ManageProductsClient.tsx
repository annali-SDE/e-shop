'use client';

import { Product } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from '@/app/utils/formatPrice';
import Heading from '@/app/components/Heading';
import InStockStatus from '@/app/components/InStockStatus';
import {
	MdCached,
	MdClose,
	MdDelete,
	MdDone,
	MdRemoveRedEye
} from 'react-icons/md';
import ActionBtn from '@/app/components/ActionBtn';

interface ManageProductsClientProps {
	products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
	products
}) => {
	let rows: any = [];
	if (products) {
		rows = products.map((product) => {
			return {
				id: product.id,
				name: product.name,
				price: formatPrice(product.price),
				category: product.category,
				brand: product.brand,
				inStock: product.inStock,
				images: product.images
			};
		});
	}

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			width: 220
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 220
		},
		{
			field: 'price',
			headerName: 'Price(USD)',
			width: 100,
			renderCell: (params) => (
				<div className='font-bold text-slate-800'>{params.row.price}</div>
			)
		},
		{
			field: 'category',
			headerName: 'Category',
			width: 100
		},
		{
			field: 'brand',
			headerName: 'Brand',
			width: 100
		},
		{
			field: 'inStock',
			headerName: 'In Stock',
			width: 120,
			renderCell: (params) => {
				return (
					<div className='h-full flex items-center justify-center'>
						{params.row.inStock === true ? (
							<InStockStatus className='bg-teal-200 text-teal-700'>
								in stock
								<MdDone size={15} />
							</InStockStatus>
						) : (
							<InStockStatus className='bg-rose-200 text-rose-700'>
								in stock
								<MdClose size={15} />
							</InStockStatus>
						)}
					</div>
				);
			}
		},
		{
			field: 'actions',
			headerName: 'Actions',
			width: 220,
			renderCell: () => {
				return (
					<div className='flex h-full gap-x-2 items-center justify-center'>
						<ActionBtn icon={MdCached} onClick={() => {}} label='Refresh' />
						<ActionBtn icon={MdDelete} onClick={() => {}} label='Delete' />
						<ActionBtn
							icon={MdRemoveRedEye}
							onClick={() => {}}
							label='Preview'
						/>
					</div>
				);
			}
		}
	];
	return (
		<div className='max-w-[1150px] m-auto text-xl'>
			<div className='mb-4 mt-8'>
				<Heading title='Manage Products' center />
			</div>
			<div style={{ height: 600, width: '100%' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: { paginationModel: { page: 0, pageSize: 9 } }
					}}
					pageSizeOptions={[9, 20]}
					checkboxSelection
					disableRowSelectionOnClick
				/>
			</div>
		</div>
	);
};
export default ManageProductsClient;
