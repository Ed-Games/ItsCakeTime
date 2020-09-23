exports.up = function(Knex){
    return Knex.schema.createTable('profile', function(table){
        table.increments();
        table.string('description').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE');


})};

exports.down = function(Knex){
    return Knex.schema.dropTable('profile');
}
