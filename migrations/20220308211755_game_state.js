/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Migrations are used when bringing dbs up or down.
// Esentially, this creates a clean new table.
export function up(knex) {
    return knex.schema.createTable('game_state', (table) => {
        table.increments('game_state_id').notNullable;
        // https://knexjs.org/#Schema-json
        table.text('cmd_history');
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