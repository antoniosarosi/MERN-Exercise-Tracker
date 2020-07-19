import React from 'react';
import BootstrapAlert from 'react-bootstrap/Alert';

const Alert = (props) => {
  if (!props.showAlert) {
    return <React.Fragment />;
  }
  const alert = props.alert;
  return (
    <BootstrapAlert
      variant={alert.success ? 'success' : 'danger'}
      onClose={props.onClose}
      dismissible
    >
      {alert.message}
    </BootstrapAlert>
  );
};

export default Alert;
