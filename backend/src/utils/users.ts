interface User {
  id: string;
  userName: string;
  roomTitle: string;
}

const users: User[] = [];

const addUser = ({ id, userName, roomTitle }: User) => {
  const userNameIsTaken = users.find(
    (user) => user.userName === userName && user.roomTitle === roomTitle
  );

  if (userNameIsTaken) {
    return { error: "That userName is already taken in this room" };
  }

  const user = {
    id,
    userName,
    roomTitle,
  };

  users.push(user);

  return { user };
};

const removeUser = (id: string) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
};

const getUser = (id: string) => users.find((user) => user.id === id);

const getRoomUsers = (roomTitle: string) =>
  users.filter((user) => user.roomTitle === roomTitle);

export { addUser, removeUser, getUser, getRoomUsers };
