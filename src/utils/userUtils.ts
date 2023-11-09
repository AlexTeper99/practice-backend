import { IUser } from "../types";

export let users: IUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "James Doe",
    email: "Jamesdoe@gmail.com",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Jane Doe",
    email: "Janedoe@gmail.com",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const generateId = () => {
  const notesIds = users.map((n) => n.id);
  const maxId = notesIds.length ? Math.max(...notesIds) : 0;
  const newId = maxId + 1;
  return newId;
};
