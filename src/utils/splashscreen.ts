export function applySplashscreenLinks(
  url = '/static/splashscreens',
  additional = []
) {
  const splashscreens = [];
  const rel = 'apple-touch-startup-image';
  const screens = [
    {
      width: 320,
      height: 568,
      ratio: 2,
      orientation: 'portrait',
      href: `${url}/iphone5_splash.png`,
    },
    {
      width: 375,
      height: 667,
      ratio: 2,
      orientation: 'portrait',
      href: `${url}/iphone6_splash.png`,
    },
    {
      width: 621,
      height: 1104,
      ratio: 3,
      orientation: 'portrait',
      href: `${url}/iphoneplus_splash.png`,
    },
    {
      width: 375,
      height: 812,
      ratio: 3,
      orientation: 'portrait',
      href: `${url}/iphonex_splash.png`,
    },
    {
      width: 414,
      height: 896,
      ratio: 2,
      orientation: 'portrait',
      href: `${url}/iphonexr_splash.png`,
    },
    {
      width: 414,
      height: 896,
      ratio: 3,
      orientation: 'portrait',
      href: `${url}/iphonexsmax_splash.png`,
    },
    {
      width: 768,
      height: 1024,
      ratio: 2,
      orientation: 'portrait',
      href: `${url}/ipad_splash.png`,
    },
    {
      width: 834,
      height: 1112,
      ratio: 2,
      orientation: 'portrait',
      href: `${url}/ipadpro1_splash.png`,
    },
    {
      width: 834,
      height: 1194,
      ratio: 2,
      orientation: 'portrait',
      href: `${url}/ipadpro3_splash.png`,
    },
    {
      width: 1024,
      height: 1366,
      ratio: 2,
      orientation: 'portrait',
      href: `${url}/ipadpro2_splash.png`,
    },
    ...additional,
  ];

  for (const { width, height, ratio, orientation, href } of screens) {
    splashscreens.push({
      rel,
      media: `(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: ${orientation})`,
      href,
    });
  }

  return splashscreens;
}
