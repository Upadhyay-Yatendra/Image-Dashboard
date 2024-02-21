import React from 'react';
import Container from '@mui/material/Container';
import ImageDashboard from './pages/ImageDashboard';

const App = () => {
  return (
    React.createElement(Container, { maxWidth: "sm" },
      React.createElement(ImageDashboard, null)
    )
  );
};

export default App;
