import React from 'react';
import { render } from '@testing-library/react';
import Search from '../Components/Search/Search';

describe('Testing the Search component', () => {
  it('renders without crashing', () => {
    render(<Search />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Search />);
    expect(asFragment()).toMatchSnapshot();
  });
});
