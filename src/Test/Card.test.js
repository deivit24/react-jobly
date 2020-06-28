import React from 'react';
import { render } from '@testing-library/react';
import CompanyCard from '../Components/Cards/CompanyCard';
import JobCard from '../Components/Cards/JobCard';
import { MemoryRouter } from 'react-router';

// Testing Company Card
describe('Testing the Company Card', () => {
  let item = {
    handle: 'rithm',
    name: 'Rithm School',
    description: 'Become an exceptional developer in 16 weeks.',
    logo_url:
      'https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg',
    num_employees: 32,
  };
  it('it renders CompanyCard without crashing', () => {
    render(
      <MemoryRouter>
        <CompanyCard item={item} />
      </MemoryRouter>
    );
  });
  it('matches snapshot for company', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyCard item={item} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

//Testing Job Card

describe('Testing the JobCard', () => {
  let item = { title: 'CEO', salary: 1000000, equity: 10 };
  it('it renders JobCard without crashing', () => {
    render(
      <MemoryRouter>
        <JobCard item={item} />
      </MemoryRouter>
    );
  });

  it('matches snapshot for job', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <JobCard item={item} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
