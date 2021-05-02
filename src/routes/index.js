import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

import { firebase } from '../services/firebase';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';

export default function Routes() {
  const RoutesListener = () => {
    const location = useLocation();
  
    useEffect(() => {
      firebase.analytics().setCurrentScreen(location.pathname);
    }, [location]);
  
    return <></>;
  };
  
  return (
    <BrowserRouter>
      <RoutesListener />
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}