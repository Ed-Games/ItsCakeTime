exports.up = function(Knex){
    return Knex.schema.createTable('profile', function(table){
        table.increments();
        table.string('description');
        table.string('whatsapp').notNullable();
        table.integer('user_id').notNullable();
        table.string('image').notNullable();
        table.string('specialty');
        table.unique('user_id');

        table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE');


})};

exports.down = function(Knex){
    return Knex.schema.dropTable('profile');
}
