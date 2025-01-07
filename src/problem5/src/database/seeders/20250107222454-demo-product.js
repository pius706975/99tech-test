'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('products', [
      {
        id: "2129c478-668e-4bfe-88d3-178b6720d8e8",
        user_id: 'cbea73f1-05ac-4c9d-854d-0c8187c603a5',
        name: 'Wagyu A1',
        price: 10000,
        condition: 'new',
        status: 'active',
        stock: 20,
        created_at: "2025-01-07 16:28:44.694 +0800",
        updated_at: "2025-01-07 18:48:25.246 +0800",
      },

      {
        id: "a3e65278-5ccb-4f3e-8439-9d37f4ec7796",
        user_id: '9114b654-d1af-4d1f-aab5-2b1475507e51',
        name: 'iPhone 23 Pro Max',
        price: 27800000,
        condition: 'new',
        status: 'active',
        stock: 21,
        created_at: "2025-01-07 19:03:35.496 +0800",
        updated_at: "2025-01-07 19:03:35.496 +0800",
      },

      {
        id: "64bdcaa8-9dfa-40db-b156-66030be8ec0a",
        user_id: '9114b654-d1af-4d1f-aab5-2b1475507e51',
        name: 'Macbook Air M1',
        price: 9000000,
        condition: 'used',
        status: 'inactive',
        stock: 0,
        created_at: "2025-01-07 19:04:12.717 +0800",
        updated_at: "2025-01-07 19:04:12.717 +0800",
      },

      {
        id: "b2b43ca6-74f8-4320-bcdc-73c69118ac5d",
        user_id: 'cbea73f1-05ac-4c9d-854d-0c8187c603a5',
        name: 'Wagyu A4',
        price: 30000,
        condition: 'used',
        status: 'active',
        stock: 10,
        created_at: "2025-01-07 18:49:39.029 +0800",
        updated_at: "2025-01-07 18:49:39.029 +0800",
      },

      {
        id: "e92b6ca2-4443-42b5-b7fb-290f043d07f2",
        user_id: 'cbea73f1-05ac-4c9d-854d-0c8187c603a5',
        name: 'Samsung S22 Ultra',
        price: 2000000,
        condition: 'new',
        status: 'active',
        stock: 10,
        created_at: "2025-01-07 19:00:29.913 +0800",
        updated_at: "2025-01-07 19:00:29.915 +0800",
      },

      {
        id: "381d65f5-19d0-4688-8619-e09261a04225",
        user_id: '9114b654-d1af-4d1f-aab5-2b1475507e51',
        name: 'Macbook Air M2',
        price: 13500000,
        condition: 'used',
        status: 'active',
        stock: 5,
        created_at: "2025-01-08 05:27:02.214 +0800",
        updated_at: "2025-01-08 05:27:02.215 +0800",
      },

      {
        id: "6b07be32-3830-4ec3-92d3-390636926a2a",
        user_id: '9114b654-d1af-4d1f-aab5-2b1475507e51',
        name: 'Macbook Air M3',
        price: 15000000,
        condition: 'new',
        status: 'active',
        stock: 5,
        created_at: "2025-01-08 05:30:30.583 +0800",
        updated_at: "2025-01-08 05:30:30.583 +0800",
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
