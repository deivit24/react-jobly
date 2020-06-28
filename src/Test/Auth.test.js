import React from 'react';
import { render } from '@testing-library/react';
import AuthForm from '../Components/Auth/Auth';
import { MemoryRouter } from 'react-router';

//Testing AuthForm

describe('Testing the AuthForm', () => {
  it('it renders AuthForm without crashing', () => {
    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
