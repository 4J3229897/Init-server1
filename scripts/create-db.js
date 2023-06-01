import { connection } from '../db/connection.js';

const { schema } = connection;
const INTERVAL = 4 * 60 * 60 * 1000; // 4h
const START_TIME = new Date('2023-05-21T09:00:00.000Z').getTime();

function getRandomStatus() {
  let statusID = Math.floor(Math.random() * 4);
  let status = 'Active';

  switch (statusID) {
      case 0:
          status = 'Active';
          break;
      case 1:
          status = 'Inactive';
          break;
      case 2:
          status = 'Suspended';
          break;
      default:
          status ='Reset';
  }

  return status;
}

await schema.dropTableIfExists('user');

await schema.dropTableIfExists('cammisuser');

await schema.createTable('cammisuser', (table) => {
  table.text('id').notNullable().primary();
  table.text('firstName').notNullable();
  table.text('lastName');
  table.text('cammisStatus');
  table.text('systemStatus');
  table.text('createdAt');
});

const users = [];
for (let n = 1; n <= 50; n++) {

    users.push({
    id: n.toString().padStart(12, '0'),
    firstName: `firstName${n}`,
    lastName: `lastName${n}`,
    cammisStatus: getRandomStatus(),
    systemStatus: getRandomStatus(),
    createdAt: new Date(START_TIME + n * INTERVAL).toISOString(),
  });
}

await schema.createTable('user', (table) => {
  table.text('id').notNullable().primary();
  table.text('email').notNullable().unique();
  table.text('password').notNullable();
});

await connection.table('cammisuser').insert(users);


await connection.table('user').insert([
  {
    id: 'AcMJpL7b413Z',
    email: 'alice@facegle.io',
    password: 'alice123',
  },
  {
    id: 'BvBNW636Z89L',
    email: 'bob@goobook.co',
    password: 'bob123',
  },
]);

process.exit();
