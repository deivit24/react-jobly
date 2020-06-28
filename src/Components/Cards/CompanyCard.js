import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
const CompanyCard = ({ item }) => {
  let details = (
    <CardText>
      Company Size: {item.num_employees} <i className="fas fa-users"></i>
    </CardText>
  );
  return (
    <Card>
      <CardImg top width="100%" src={item.logo_url} alt="Card image cap" />
      <CardBody>
        <CardTitle className="font-weight-bold text-center">
          <Link to={`/companies/${item.handle}`} key={item.handle}>
            {item.name}
          </Link>
        </CardTitle>
        <CardText>{item.description}</CardText>
        {item.num_employees ? details : null}
      </CardBody>
    </Card>
  );
};

export default CompanyCard;
