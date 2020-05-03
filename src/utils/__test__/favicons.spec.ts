import * as favicons from '../favicons';

describe('favicons.ts', () => {
  test('applyFaviconLinks should match snapshot with default values', () => {
    const links = favicons.applyFaviconLinks();
    expect(links).toMatchSnapshot();
  });

  test('applyFaviconLinks should match snapshot with given values', () => {
    const links = favicons.applyFaviconLinks({
      path: '/test',
      manifestPath: '/test/test.json',
      color: '#000',
    });
    expect(links).toMatchSnapshot();
  });

  test('applyFaviconMetaTags should match snapshot with default values', () => {
    const links = favicons.applyFaviconMetaTags();
    expect(links).toMatchSnapshot();
  });

  test('applyFaviconMetaTags should match snapshot with given values', () => {
    const links = favicons.applyFaviconMetaTags({
      color: '#000',
      path: '/test',
      statusBarStyle: 'black-translucent',
    });
    expect(links).toMatchSnapshot();
  });
});
