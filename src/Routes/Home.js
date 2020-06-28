import React from 'react';
import img from '../Static/img/jobly.gif';
import '../Static/css/Home.css';

const Home = () => {
  return (
    <section className="Home">
      <h1>Welcome to Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      <img src={img} alt="" />
    </section>
  );
};

export default Home;
