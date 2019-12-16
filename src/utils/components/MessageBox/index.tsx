import React from 'react';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MessageBoxI {
  message: string;
  heading?: string;
}

const MessageBox = ({ message, heading }: MessageBoxI) => {
  if (!heading) {
    heading = 'ERROR';
  }
  return (
    <Alert variant="danger">
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default MessageBox;
