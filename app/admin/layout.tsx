import type { Metadata } from 'next';
import AdminNav from '../components/admin/AdminNav';

export const metedata: Metadata = {
	title: 'E-Shop Admin',
	description: 'E-Shop Admin Dashboard'
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<AdminNav />
			{children}
		</div>
	);
};
export default AdminLayout;
