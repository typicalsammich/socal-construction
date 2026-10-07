import {siteUrl} from '../lib/site-url';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/review-admin']},sitemap:siteUrl()+'/sitemap.xml'}}
