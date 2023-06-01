import { connection } from './connection.js';
import { generateId } from './ids.js';

const getCammisUserTable = () => connection.table('cammisuser');

export async function getCammisUsers() {
  return await getCammisUserTable().select();
}

export async function getCammisUser(id) {
  return await getCammisUserTable().first().where({ id });
}

export async function addUser({ firstName, lastName, cammisStatus, systemStatus }) {
    console.log("in function first name", firstName);
  const user = {
    id: generateId(),
    firstName,
    lastName,
    cammisStatus,
    systemStatus,
    createdAt: new Date().toISOString(),
  };
  await getCammisUserTable().insert(user);
  return user;
}

export async function deleteUser(id) {
  const user = await getCammisUserTable().first().where({ id });
  if (!user) {
    return null;
  }
  await getCammisUserTable().delete().where({ id });

  return user;
}

export async function updateUser({ id, firstName, lastName, cammisStatus, systemStatus }) {
  const user = await getCammisUserTable().first().where({ id });
  if (!user) {
    return null;
  }
  const updatedFields = { firstName, lastName, cammisStatus, systemStatus };
  await getCammisUserTable().update(updatedFields).where({ id });
  return { ...user, ...updatedFields };
}
