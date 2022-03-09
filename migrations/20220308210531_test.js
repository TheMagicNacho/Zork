/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Migrations are used when bringing dbs up or down.
// Esentially, this creates a clean new table.
export function up(knex) {
    return knex.schema.createTable('test', (table) => {
      // id
      table.increments('id').notNullable;
      // title
      table.string('title').notNullable();
      // data
      table.string('data');
      // creation & update
      table.timestamps(true, true);
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTableIfExists('test');
  }