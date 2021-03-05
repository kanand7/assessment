import React from 'react';
import { ApplicationContext as ApplicationContextType } from './types';
import Action from './actions/actionTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

const ApplicationContext = React.createContext<ApplicationContextType>({
  loading: false,
  symbols: [],
  history: []
});

export const DispatchContext = React.createContext<React.Dispatch<Action>>(noOp);

export default ApplicationContext;
