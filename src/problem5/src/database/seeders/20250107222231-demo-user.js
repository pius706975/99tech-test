'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '9114b654-d1af-4d1f-aab5-2b1475507e51',
        email: 'user1@gmail.com',
        name: 'John Doe',
        username: 'user1-m5md2c16',
        password: '$2b$10$G06tnpnF1/Zzx0rGeo1dEeGdMpBpOs6jWiTa0oannshEnqvjA.zaO',
        created_at: new Date('2025-01-07T11:02:01.694Z'),
        updated_at: new Date('2025-01-07T11:02:01.694Z'),
      },

      {
        id: 'cbea73f1-05ac-4c9d-854d-0c8187c603a5',
        email: 'user2@gmail.com',
        name: 'jane Doe',
        username: 'user2-m5md2c16',
        password: '$2b$10$G06tnpnF1/Zzx0rGeo1dEeGdMpBpOs6jWiTa0oannshEnqvjA.zaO',
        created_at: new Date('2025-01-07T11:02:01.694Z'),
        updated_at: new Date('2025-01-07T11:02:01.694Z'),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
