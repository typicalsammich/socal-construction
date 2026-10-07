import {areas,business} from '../../data';
import {AreaDetail} from '../../components/site';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return areas.map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=areas.find(a=>a.slug===slug);if(!a)return {};return {title:a.name+' Construction & Remodeling',description:a.intro+' Call So-Cal Construction at '+business.phone+' to discuss your local project.',alternates:{canonical:'/service-areas/'+slug}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=areas.find(a=>a.slug===slug);if(!a)notFound();return <AreaDetail area={a}/>}
