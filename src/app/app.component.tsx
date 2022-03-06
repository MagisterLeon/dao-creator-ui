import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React, { ReactElement } from 'react';

import { WalletProvider } from 'contexts/wallet';
import RootRoutes from 'routes/root.routes';

const App = (): ReactElement => (
  <WalletProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <RootRoutes/>
        <ToastContainer/>
      </Router>
    </LocalizationProvider>
  </WalletProvider>
);

export default App;
