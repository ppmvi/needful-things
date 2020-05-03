import { LinkPropertyBase, LinkPropertyHref, MetaPropertyName } from 'vue-meta';

interface FaviconLinksOptions {
  path?: string;
  manifestPath?: string;
  color?: string;
}

interface FaviconMetaTagsOptions {
  path?: string;
  color?: string;
  statusBarStyle?: 'default' | 'black' | 'black-translucent';
}

export function applyFaviconLinks(
  options: FaviconLinksOptions = {}
): (LinkPropertyBase | LinkPropertyHref)[] {
  const {
    path = '/static/icons',
    manifestPath = '/static/manifest.json',
    color = '#FFFFFF',
  } = options;

  return [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: `${path}/apple-touch-icon.png`,
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: `${path}/favicon-32x32.png`,
      sizes: '32x32',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: `${path}/favicon-16x16.png`,
      sizes: '16x16',
    },
    { rel: 'manifest', href: `${manifestPath}` },
    { rel: 'mask-icon', href: `${path}/safari-pinned-tab.svg`, color: color },
    { rel: 'shortcut icon', href: `${path}/favicon.ico` },
  ];
}

export function applyFaviconMetaTags(
  options: FaviconMetaTagsOptions = {}
): MetaPropertyName[] {
  const {
    path = '/static/icons',
    color = '#FFFFFF',
    statusBarStyle = 'default',
  } = options;

  return [
    { name: 'msapplication-TileColor', content: color },
    { name: 'msapplication-config', content: `${path}/browserconfig.xml` },
    { name: 'theme-color', content: color },
    { name: 'apple-mobile-web-app-status-bar-style', content: statusBarStyle },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
  ];
}
