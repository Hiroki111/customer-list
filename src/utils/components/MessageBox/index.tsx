import React from 'react';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.scss';

interface MessageBoxI {
  message: JSX.Element;
  variant: 'success' | 'danger' | 'info';
  heading?: string;
}

const MessageBox = ({ message, variant, heading }: MessageBoxI) => {
  return (
    <Alert variant={variant}>
      {heading && <Alert.Heading>{heading}</Alert.Heading>}
      {message}
    </Alert>
  );
};

export default MessageBox;
