import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../API';
import CompanyCard from '../Cards/CompanyCard';
import JobCard from '../Cards/JobCard';
import UserContext from '../../Helpers/UserContext';
import Loading from '../../Helpers/Loading';

const CompanyDetails = () => {
  const { handle } = useParams();
  const { currentUser } = useContext(UserContext);

  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompanyAndJobs() {
      const { jobs } = currentUser;
      const c = await API.getCompany(handle);

      const jobsIDsAppliedTo = new Set(jobs.map((job) => job.id));

      c.jobs = c.jobs.map((job) => ({
        ...job,
        state: jobsIDsAppliedTo.has(job.id) ? 'applied' : null,
      }));

      setCompany(c);
    }

    getCompanyAndJobs();
  }, [handle, currentUser]);

  async function apply(idx) {
    if (company && Array.isArray(company.jobs) && idx < company.jobs.length) {
      let jobId = company.jobs[idx].id;
      let message = await API.applyToJob(jobId);
      setCompany((c) => {
        let newCompany = { ...c };
        newCompany.jobs = newCompany.jobs.map((job) =>
          job.id === jobId ? { ...job, state: message } : job
        );
        return newCompany;
      });
    }
  }

  if (!company) {
    return <Loading type="spin" color="#212aa5" />;
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12 text-center my-3">
          <h1>{company.name}</h1>
          <p>Open Positions Available</p>
        </div>
        <div className="col-md-4">
          <CompanyCard item={company} />
        </div>
        <div className="col-md-8">
          {company.jobs.map((job, idx) => (
            <div className="mb-3" key={idx}>
              <JobCard idx={idx} handleApply={() => apply(idx)} item={job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
