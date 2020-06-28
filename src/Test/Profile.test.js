import React from 'react';
import { render } from '@testing-library/react';
import Profile from '../Components/Profile/Profile';
import { UserProvider } from '../testUtils';

describe('Testing the Profile component', () => {
  it('renders without crashing', () => {
    render(
      <UserProvider>
        <Profile />
      </UserProvider>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <UserProvider>
        <Profile />
      </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
