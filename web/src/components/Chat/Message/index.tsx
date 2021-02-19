import React from "react";

import { MessageFormat } from "../index";

import { Container } from "./styles";

interface MessageProps {
  message: MessageFormat;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <Container>
      <p>
        <span>{message.user}</span>
        {message.time}
      </p>
      <p>{message.text}</p>
    </Container>
  );
};

export default Message;
