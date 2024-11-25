import AdminNav from '../components/admin/AdminNav';

export const metedata = {
  title: 'E-Shop Admin',
  description: 'E-Shop Admin Dashboard'
}

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<AdminNav />
    {children}
		</div>
	);
};
export default layout;
