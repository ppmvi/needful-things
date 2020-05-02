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

export function applyFacebookMetaTags(meta: FacebookMetaTags = {}) {
  const {
    type = '',
    title = '',
    description = '',
    image = '',
    siteName = '',
    url = '',
  } = meta;

  return [
    type && { property: 'og:type', content: type },
    title && { property: 'og:title', content: title },
    description && { property: 'og:description', content: description },
    image && { property: 'og:image', content: image },
    siteName && { property: 'og:site_name', content: siteName },
    url && { property: 'og:url', content: url },
  ].filter((tag) => tag);
}

export function applyTwitterMetaTags(meta: TwitterMetaTags = {}) {
  const {
    title = '',
    description = '',
    image = '',
    site = '',
    creator = '',
  } = meta;

  return [
    title && { property: 'twitter:title', content: title },
    description && { property: 'twitter:description', content: description },
    image && { property: 'twitter:image', content: image },
    site && { property: 'twitter:site', content: site },
    creator && { property: 'twitter:creator', content: creator },
  ].filter((tag) => tag);
}
