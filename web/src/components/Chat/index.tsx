import React from "react";
import { useParams } from "react-router-dom";

// import { Container } from './styles';
interface JoinRoomRouteParams {
  roomTitle: string;
  userName: string;
}

const Chat: React.FC = () => {
  const routeParams = useParams<JoinRoomRouteParams>();

  return <h1>{`Chat: ${routeParams.roomTitle}${routeParams.userName}`}</h1>;
};

export default Chat;
