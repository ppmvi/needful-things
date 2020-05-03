import {
  MetaPropertyCharset,
  MetaPropertyEquiv,
  MetaPropertyName,
  MetaPropertyMicrodata,
  MetaPropertyProperty,
} from 'vue-meta';

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

export function applyFacebookMetaTags(
  meta: FacebookMetaTags = {}
): (
  | MetaPropertyCharset
  | MetaPropertyEquiv
  | MetaPropertyName
  | MetaPropertyMicrodata
  | MetaPropertyProperty
)[] {
  const {
    type = '',
    title = '',
    description = '',
    image = '',
    siteName = '',
    url = '',
  } = meta;

  return [
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: siteName },
    { property: 'og:url', content: url },
  ].filter((tag) => tag);
}

export function applyTwitterMetaTags(
  meta: TwitterMetaTags = {}
): (
  | MetaPropertyCharset
  | MetaPropertyEquiv
  | MetaPropertyName
  | MetaPropertyMicrodata
  | MetaPropertyProperty
)[] {
  const {
    title = '',
    description = '',
    image = '',
    site = '',
    creator = '',
  } = meta;

  return [
    { property: 'twitter:title', content: title },
    { property: 'twitter:description', content: description },
    { property: 'twitter:image', content: image },
    { property: 'twitter:site', content: site },
    { property: 'twitter:creator', content: creator },
  ].filter((tag) => tag);
}
