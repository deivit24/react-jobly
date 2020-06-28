import React from 'react';

import { Card, CardBody, CardTitle, CardText, ButtonToggle } from 'reactstrap';
import numeral from 'numeral';
const JobCard = ({ item, handleApply }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="font-weight-bold">
          <h4>{item.title}</h4>
        </CardTitle>
        <CardText>Salary {numeral(item.salary).format('$ 0,0[.]00')}</CardText>
        <CardText>
          {' '}
          Equity {numeral(item.equity).format('0%')}
          <ButtonToggle
            onClick={handleApply}
            color="info"
            className="float-right"
          >
            {item.state ? 'Applied' : 'Apply'}
          </ButtonToggle>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default JobCard;
