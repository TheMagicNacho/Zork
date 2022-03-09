/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Migrations are used when bringing dbs up or down.
// Esentially, this creates a clean new table.
export function up(knex) {
    return knex.schema.createTable('user_to_game', (table) => {
      // id [created]
      table.increments('user_to_game_id').notNullable;
      // username [supplied]
      table.mediumint('game_id').notNullable();
      table.mediumint('user_id').notNullable();
      // created and modified
      table.timestamps(true, true);
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTableIfExists('users');
  }