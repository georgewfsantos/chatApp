import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
} from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import { Container, Content, Wrapper } from "./styles";
interface JoinRoomRouteParams {
  roomTitle: string;
  userName: string;
}

let socket: Socket;

const Chat: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const routeParams = useParams<JoinRoomRouteParams>();

  useEffect(() => {
    socket = io("http://localhost:3333");

    socket.on("message", (message: string) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        socket.emit("inputMessage", message);
      }
    },
    [message]
  );

  return (
    <Wrapper>
      <Container>
        <Content>
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          ></textarea>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Chat;
