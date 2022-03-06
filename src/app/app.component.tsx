import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React, { ReactElement } from 'react';

import { WalletProvider } from 'contexts/wallet';
import RootRoutes from 'routes/root.routes';

const App = (): ReactElement => (
  <WalletProvider>
    <Router>
      <RootRoutes/>
      <ToastContainer/>
    </Router>
  </WalletProvider>
);

export default App;
