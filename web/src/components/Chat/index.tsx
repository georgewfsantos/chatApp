import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
} from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import { Container, Content } from "./styles";
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
    socket = io("localhost:3333");

    setUserName(routeParams.userName);
    setRoomTitle(routeParams.roomTitle);

    socket.emit(
      "join",
      {
        userName: String(userName),
        roomTitle: String(roomTitle),
      },
      () => {}
    );

    return () => {
      socket.emit("user_disconnect");

      socket.off();
    };
  }, [roomTitle, routeParams.roomTitle, routeParams.userName, userName]);

  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      if (message) {
        socket.emit("sendMessage", message, () => setMessage(""));
      }
    },
    [message]
  );

  console.log(message, messages);

  const handleEnterKeyPress = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) =>
      event.key === "Enter" ? sendMessage(event) : null,
    [sendMessage]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  return (
    <Container>
      <Content>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={handleEnterKeyPress}
        ></textarea>
      </Content>
    </Container>
  );
};

export default Chat;
