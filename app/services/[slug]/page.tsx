import {services,business} from '../../data';
import {ServiceDetail} from '../../components/site';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=services.find(s=>s.slug===slug);if(!s)return {};return {title:s.name+' in the Inland Empire',description:s.intro+' So-Cal Construction serves Southern California. Call '+business.phone+'. License #'+business.license+'.',alternates:{canonical:'/services/'+slug}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=services.find(s=>s.slug===slug);if(!s)notFound();const schema={'@context':'https://schema.org','@type':'Service',name:s.name,description:s.intro,provider:{'@type':'GeneralContractor',name:business.name},areaServed:{'@type':'Place',name:'Inland Empire and Southern California'}};return <><ServiceDetail service={s}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>}
