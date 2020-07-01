import React, { useState, useEffect } from 'react';
import API from '../../API';
import Search from '../Search/Search';
import CompanyCard from '../Cards/CompanyCard';
import Loading from '../../Helpers/Loading';

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let companies = await API.getCompanies();

      setCompanies(companies);
    }
    getCompanies();
  }, []);

  async function handleSearch(search) {
    let companies = await API.getCompanies(search);
    setCompanies(companies);
  }
  if (companies.length === 0) {
    return <Loading type="spin" color="#212aa5" />;
  }
  let none = <p>Sorry no results</p>;
  let found = companies.map((company) => (
    <div key={company.handle} className="col-md-3 mb-3">
      <CompanyCard item={company} />
    </div>
  ));
  return (
    <section className="container mt-5">
      <h3 className="mt-5 mb-3 text-center">Search for Companies </h3>
      <Search endpoint="companies" searchFor={handleSearch} />
      <div className="row mt-5">{companies.length ? found : none}</div>
    </section>
  );
};

export default Companies;
