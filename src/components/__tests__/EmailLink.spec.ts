import { mount, createLocalVue } from '@vue/test-utils';
import EmailLink from '../EmailLink.vue';

delete window.location;
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

const localVue = createLocalVue();

function wrapperFactory() {
  return mount(EmailLink, {
    localVue,
    propsData: {
      email: 'test@test.de',
    },
  });
}

describe('EmailLink.vue', () => {
  test('renders correctly', () => {
    const wrapper = wrapperFactory();
    expect(wrapper.element).toMatchSnapshot();
  });

  test('component is a vue instance', () => {
    const wrapper = wrapperFactory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('email should be splitted by @ symbol', () => {
    const wrapper = wrapperFactory();
    expect((wrapper.vm as any).splittedEmail).toEqual(['test', 'test.de']);
  });

  test('click on "a" tag should set window.location.href to mailto', () => {
    const wrapper = wrapperFactory();
    wrapper.find('a').trigger('click');
    expect(window.location.href).toBe('mailto:test@test.de');
  });
});
