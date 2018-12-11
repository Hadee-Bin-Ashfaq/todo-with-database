import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

function SimpleSnackbar(props) {
  const { open, close, message } = props;
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={close}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    </div>
  );
}

export default SimpleSnackbar;