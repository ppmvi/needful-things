import { LinkPropertyBase, LinkPropertyHref, MetaPropertyName } from 'vue-meta';
interface FaviconLinksOptions {
    path?: string;
    manifestPath?: string;
    color?: string;
}
interface FaviconMetaTagsOptions {
    name?: string;
    path?: string;
    color?: string;
    statusBarStyle?: 'default' | 'black' | 'black-translucent';
}
export declare function applyFaviconLinks(options?: FaviconLinksOptions): (LinkPropertyBase | LinkPropertyHref)[];
export declare function applyFaviconMetaTags(options?: FaviconMetaTagsOptions): MetaPropertyName[];
export {};
