import React from "react";

import { Container } from "./styles";

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <Container>
      <p>
        <span>RandomUser</span>2:00am
      </p>
      <p>{message}</p>
    </Container>
  );
};

export default Message;
