import AdminLayoutWrapper from "./_components/AdminLayoutWrapper";

export const metadata = {
  title: 'Admin Panel | LifeLine Blood Service',
  description: 'Admin dashboard for managing users, campaigns, and inventory',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  );
}
