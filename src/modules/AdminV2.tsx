import { AdminApp, createDemoAdapter, type AdminAdapter } from '@laetoli/admin';
import '@laetoli/admin/styles.css';

const base = createDemoAdapter({ key: 'TABHOS', name: 'TABHOS' });
const adapter: AdminAdapter = { ...base };

export default function AdminV2() { return <AdminApp adapter={adapter} />; }
