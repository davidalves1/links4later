import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Header from './Header.vue';
import * as logoutService from '../services/logout';


describe('<Header />', () => {
  const render = () => shallowMount(Header);
  const doLogout = vi.spyOn(logoutService, 'doLogout');

  beforeEach(() => {
    vi.clearAllMocks()
  });

  it('should render component correctly', () => {
    const wrapper = render();
    const links = wrapper.findAll('router-link');

    expect(wrapper.exists()).toBeTruthy();
    expect(links.length).toBe(2);
    expect(links.at(0)?.text()).toContain('Links4Later');
    expect(links.at(1)?.text()).toContain('Sign out');
  });

  it('should do logout when sign out buttons is clicked', () => {
    const wrapper = render();
    const signOutButton = wrapper.findAll('router-link').at(1);

    signOutButton?.trigger('click')

    expect(doLogout).toHaveBeenCalledTimes(1);
  })
})
