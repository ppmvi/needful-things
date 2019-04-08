export function applyFaviconLinks(options = {}) {
  const {
    url = '/static/icons',
    manifest = {},
    color = '#FFFFFF'
  } = options;

  const {
    url: manifestUrl = '/static',
    name: manifestName = 'manifest.json'
  } = manifest;

  return [
    { rel: 'apple-touch-icon', sizes: '180x180', href: `${url}/apple-touch-icon.png` },
    { rel: 'icon', type: 'image/png', href: `${url}/favicon-32x32.png`, sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: `${url}/favicon-16x16.png`, sizes: '16x16' },
    { rel: 'manifest', href: `${manifestUrl}/${manifestName}` },
    { rel: 'mask-icon', href: `${url}/safari-pinned-tab.svg`, color: color },
    { rel: 'shortcut icon', href: `${url}/favicon.ico` }
  ];
}

export function applyFaviconMetaTags(options = {}) {
  const {
    url = '/static/icons',
    color = '#FFFFFF',
    statusBarStyle = 'default'
  } = options;

  return [
    { name: 'msapplication-TileColor', content: color },
    { name: 'msapplication-config', content: `${url}/browserconfig.xml` },
    { name: 'theme-color', content: color },
    { name: 'apple-mobile-web-app-status-bar-style', content: statusBarStyle },
    { name: 'apple-mobile-web-app-capable', content: 'yes' }
  ];
}
