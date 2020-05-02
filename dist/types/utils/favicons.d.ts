interface FaviconLinksOptions {
    url?: string;
    manifest?: {
        url?: string;
        name?: string;
    };
    color?: string;
}
interface FaviconMetaTagsOptions {
    url?: string;
    color?: string;
    statusBarStyle?: string;
}
export declare function applyFaviconLinks(options?: FaviconLinksOptions): ({
    rel: string;
    sizes: string;
    href: string;
    type?: undefined;
    color?: undefined;
} | {
    rel: string;
    type: string;
    href: string;
    sizes: string;
    color?: undefined;
} | {
    rel: string;
    href: string;
    sizes?: undefined;
    type?: undefined;
    color?: undefined;
} | {
    rel: string;
    href: string;
    color: string;
    sizes?: undefined;
    type?: undefined;
})[];
export declare function applyFaviconMetaTags(options?: FaviconMetaTagsOptions): {
    name: string;
    content: string;
}[];
export {};
