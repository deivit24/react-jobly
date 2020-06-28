import React, { useState, useEffect } from 'react';
import API from '../../API';
import Search from '../Search/Search';
import JobCard from '../Cards/JobCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      let jobs = await API.getJobs();

      setJobs(jobs);
    }
    getJobs();
  }, []);

  async function handleSearch(search) {
    let jobs = await API.getJobs(search);
    setJobs(jobs);
  }

  async function apply(idx) {
    let jobId = jobs[idx].id;
    let message = await API.applyToJob(jobId);
    setJobs((j) =>
      j.map((job) => (job.id === jobId ? { ...job, state: message } : job))
    );
  }
  let none = <p>Sorry no results</p>;
  let found = jobs.map((job, idx) => (
    <div key={idx} className="col-md-6 mb-3">
      <JobCard idx={idx} item={job} handleApply={() => apply(idx)} />
    </div>
  ));
  return (
    <section className="container mt-5">
      <h3 className="mt-5 mb-3 text-center">Search for Companies </h3>
      <Search endpoint="jobs" searchFor={handleSearch} />
      <div className="row mt-5">{jobs.length ? found : none}</div>
    </section>
  );
};

export default Jobs;
