import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from '../Routes/Home';
import { UserProvider } from '../testUtils';

describe('Testing the Home component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when logged out', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider currentUser={null}>
          <Home />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
