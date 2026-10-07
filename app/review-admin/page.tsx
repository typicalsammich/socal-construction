import {isAdmin} from '../../lib/admin-auth';
import {ReviewAdmin} from '../components/review-admin';
import {AdminLogin} from '../components/admin-login';
export const runtime='nodejs';export const dynamic='force-dynamic';
export const metadata={title:'Review Management',robots:{index:false,follow:false},alternates:{canonical:'/review-admin'}};
export default async function Page(){return await isAdmin()?<ReviewAdmin/>:<AdminLogin/>}
