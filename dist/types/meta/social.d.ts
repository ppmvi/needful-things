import { MetaPropertyProperty } from 'vue-meta';
interface FacebookMetaTags {
    type?: string;
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    url?: string;
}
interface TwitterMetaTags {
    title?: string;
    description?: string;
    image?: string;
    site?: string;
    creator?: string;
}
export declare function applyFacebookMetaTags(meta?: FacebookMetaTags): MetaPropertyProperty[];
export declare function applyTwitterMetaTags(meta?: TwitterMetaTags): MetaPropertyProperty[];
export {};
