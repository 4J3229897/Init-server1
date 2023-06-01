
import { getCammisUsers, getCammisUser, addUser, deleteUser, updateUser } from './db/cammisUsers.js';

export const resolvers = {
  Query: {
    cammisusers: () => getCammisUsers(),
    cammisuser: async (_root, {id}) => {
      const user = await getCammisUser(id);
      return user;
    },
  },

  Mutation: {
    addUser: (_root, {input: {firstName, lastName, cammisStatus, systemStatus}}) => {
        
        return addUser({firstName, lastName, cammisStatus, systemStatus});
    },
    deleteUser: (_root, { id }) => deleteUser(id),

    updateUser: (_root, {input: {id, firstName, lastName, cammisStatus, systemStatus }}) => {return updateUser({id, firstName, lastName, cammisStatus, systemStatus })},
  }
  
};


