import {services,areas} from './data';
import {siteUrl} from '../lib/site-url';
export default function sitemap(){const base=siteUrl();return ['','/services','/projects','/about','/reviews','/contact','/privacy','/service-areas',...services.map(s=>'/services/'+s.slug),...areas.map(a=>'/service-areas/'+a.slug)].map(path=>({url:base+path,changeFrequency:'monthly' as const,priority:path===''?1:.7}))}
