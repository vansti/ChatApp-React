import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'

const rrfConfig = {
  userProfile: 'profiles', 
  presence: 'presence',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, rrfConfig), 
    reduxFirestore(fbConfig) 
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  registerServiceWorker();
});