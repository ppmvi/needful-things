import { mount, createLocalVue } from '@vue/test-utils';
import TelLink from '../TelLink.vue';

delete window.location;
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

const localVue = createLocalVue();

function wrapperFactory(props = {}) {
  return mount(TelLink, {
    localVue,
    propsData: {
      tel: '(0) 123-456 789',
      ...props,
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

  test('should not render tel when doNotShowTel is true', () => {
    const wrapper = wrapperFactory({ doNotShowTel: true });
    expect(wrapper.find('span').exists()).toBeFalsy();
  });

  test('passed tel should remove white spaces, brackets and hyphen', () => {
    const wrapper = wrapperFactory();
    expect((wrapper.vm as any).callableTel).toBe('123456789');
    wrapper.setProps({
      tel: '+49 (0) 123 456 789',
    });
    expect((wrapper.vm as any).callableTel).toBe('+49123456789');
  });

  test('click on "a" tag should set window.location.href to mailto', () => {
    const wrapper = wrapperFactory();
    wrapper.find('a').trigger('click');
    expect(window.location.href).toBe('tel:123456789');
  });
});
