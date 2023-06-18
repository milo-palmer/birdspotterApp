/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {
      id: 1,
      comment: 'This is a cool picture',
      post_id: 1,
      name: 'UserMan123',
    },
    {
      id: 2,
      comment: 'This is a great picture',
      post_id: 1,
      name: 'UserMan123',
    },
    {
      id: 3,
      comment: 'This is a cool picture',
      post_id: 2,
      name: 'UserMan123',
    },
    {
      id: 4,
      comment: 'This is a amazing picture',
      post_id: 2,
      name: 'UserMan123',
    },
    {
      id: 5,
      comment: 'This is a cool picture',
      post_id: 3,
      name: 'UserMan123',
    },
  ])
}
