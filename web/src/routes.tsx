import React from "react";
import { Switch, Route } from "react-router-dom";

import JoinRoom from "./components/JoinRoom";
import Chat from "./components/Chat";

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={JoinRoom} />
      <Route path="/chat/:user/:room" component={Chat} />
    </Switch>
  );
};

export default Routes;
