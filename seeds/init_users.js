/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const table = 'users';

 export async function seed(knex) {
   // Deletes ALL existing entries
   await knex(table).del()
   await knex(table).insert([
     { username: 'joshypoo'},
     { username: 'justiepee'},
     { username: 'AngryOwl'},
     { username: 'HappyMonkey'},
     { username: 'ScaredFish'},
     { username: 'Silly-Cat'},
     { username: 'sArCasTicCase'},
     { username: 'user With Space In Name'},
     { username: 'SOmeone with Emoji 🦄'},
     { username: 'userWithNumbers123809'},
     { username: 'nonstandardtext¯\_(ツ)_/¯'}
   ]);
 }