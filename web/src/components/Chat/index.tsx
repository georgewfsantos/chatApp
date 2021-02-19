import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { FiMessageSquare, FiUsers } from "react-icons/fi";

import Message from "../Chat/Message";

import { Container, Content, Wrapper } from "./styles";
interface JoinRoomRouteParams {
  roomTitle: string;
  userName: string;
}

let socket: Socket;

const Chat: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const routeParams = useParams<JoinRoomRouteParams>();

  useEffect(() => {
    socket = io("http://localhost:3333");

    socket.on("message", (welcomeUserMessage: string) => {
      setMessages((state) => [...state, welcomeUserMessage]);
    });

    socket.on("sendMessage", (sentMessage: string) => {
      setMessages((state) => [...state, sentMessage]);
    });
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        socket.emit("inputMessage", message);

        setMessage("");
      }
    },
    [message]
  );

  const handleLeaveRoom = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Wrapper>
      <Container>
        <Content>
          <div className="header">
            <p>
              <h2>ChatApp</h2>
            </p>
            <button onClick={handleLeaveRoom}>Leave</button>
          </div>

          <div className="chat">
            <ul className="sidebar">
              <li>
                <FiMessageSquare size={20} />
                <strong>Room Info:</strong>
              </li>
              <li className="room">Tennis</li>
              <li>
                <FiUsers size={20} />
                <strong>Users</strong>
              </li>
              <li className="user-name">Me</li>
            </ul>
            <div className="chat-window">
              {messages.map((msg, index) => (
                <Message key={index} message={msg} />
              ))}
            </div>
          </div>
          <div className="user-input">
            <input
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            ></input>
          </div>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Chat;
