/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const table = 'user_to_game';

 export async function seed(knex) {
   // Deletes ALL existing entries
   await knex(table).del()
   await knex(table).insert([
      {game_id: 1, user_id: 1},
      {game_id: 2, user_id: 1},
      {game_id: 3, user_id: 1},
      {game_id: 4, user_id: 2}
   ]);
 }