import React from 'react';
import { render } from '@testing-library/react';
import Companies from '../Components/Companies/Companies';
import CompanyDetails from '../Components/Companies/CompanyDetails';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';

//Testing Companies and Company Details

describe('Testing Companies and Company Details', () => {
  it('it renders Companies without crashing', () => {
    render(
      <MemoryRouter>
        <Companies />
      </MemoryRouter>
    );
  });
  it('it renders CompanyDetails without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <CompanyDetails />
        </UserProvider>
      </MemoryRouter>
    );
  });
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Companies />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <CompanyDetails />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
