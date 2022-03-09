/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const table = 'game_state';
//TODO: provide better test player objects. Object with things in inventory.
 export async function seed(knex) {
   // Deletes ALL existing entries
   await knex(table).del()
   await knex(table).insert([
    {player_object:  {"output":"You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.","inventory":"","score":0,"moves":2,"currentRoom":"northOfHouse","previousRoom":"westOfHouse","gameIsSaved":false,"verbose":false}},
    {player_object:  {"output":"This is a path winding through a dimly lit forest. The path heads north-south here.<br /> One particulary large tree with some low branches stands at the edge of the path.","inventory":[],"score":0,"moves":3,"currentRoom":"forestPath","previousRoom":"northOfHouse","gameIsSaved":false,"verbose":false}},
    {player_object:  {"output":"You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.","inventory":"","score":0,"moves":2,"currentRoom":"northOfHouse","previousRoom":"westOfHouse","gameIsSaved":false,"verbose":false}},
    {player_object:  {"output":"You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.","inventory":"","score":0,"moves":2,"currentRoom":"northOfHouse","previousRoom":"westOfHouse","gameIsSaved":false,"verbose":false}},
    {player_object:  {"output":"You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.","inventory":"","score":0,"moves":2,"currentRoom":"northOfHouse","previousRoom":"westOfHouse","gameIsSaved":false,"verbose":false}},
    {player_object:  {"output":"You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.","inventory":"","score":0,"moves":2,"currentRoom":"northOfHouse","previousRoom":"westOfHouse","gameIsSaved":false,"verbose":false}}
   ]);
 }