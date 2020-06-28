import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const Message = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color={type} isOpen={visible} toggle={onDismiss}>
      {message}
    </Alert>
  );
};

export default Message;
