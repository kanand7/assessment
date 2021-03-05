import React, { useMemo, useReducer, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/layout';
import Routes from './routes';
import AppContext, { DispatchContext } from './store/ApplicationContext';
import { ApplicationContext } from './store/types';
import reducer, { initialState } from './store/reducer';
import { setSymbols } from './store/actions/actions';
import { fetchAllSymbols } from './store/services';


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchAllSymbols().then((symbols) => {
      symbols && dispatch(setSymbols(symbols));
    });
  }, []);

  const applicationStore = useMemo < ApplicationContext >(() => ({
    loading: false,
    symbols: state.symbols,
    history: state.history
  }), [state]);

  return (
    <AppContext.Provider value={applicationStore}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </DispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
