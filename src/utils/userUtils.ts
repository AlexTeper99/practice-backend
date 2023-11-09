import { users } from '../routes';

export const generateId = () => {
  const notesIds = users.map((n) => n.id);
  const maxId = notesIds.length ? Math.max(...notesIds) : 0;
  const newId = maxId + 1;
  return newId;
};
