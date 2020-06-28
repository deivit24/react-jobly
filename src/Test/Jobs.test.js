import React from 'react';
import { render } from '@testing-library/react';
import Jobs from '../Components/Jobs/Jobs';

describe('Testing the Jobs component', () => {
  it('renders without crashing', () => {
    render(<Jobs />);
  });

  it('matches snapshot with no jobs', () => {
    const { asFragment } = render(<Jobs />);
    expect(asFragment()).toMatchSnapshot();
  });
});
