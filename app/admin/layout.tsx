import AdminNav from '../components/admin/AdminNav';
import type { Metadata } from 'next';

export const metedata: Metadata = {
	title: 'E-Shop Admin',
	description: 'E-Shop Admin Dashboard'
};

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<AdminNav />
			{children}
		</div>
	);
};
export default layout;
