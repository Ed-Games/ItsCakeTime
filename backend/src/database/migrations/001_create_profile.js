exports.up = function(Knex){
    return Knex.schema.createTable('profile', function(table){
        table.increments();
        table.string('description').defaultTo("Nenhuma biografia adicionada");
        table.string('whatsapp').notNullable();
        table.decimal('user_id').notNullable();
        table.string('image');
        table.string('specialty').defaultTo("Nenhuma especialidade informada");
        table.unique('user_id');

        table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE');


})};

exports.down = function(Knex){
    return Knex.schema.dropTable('profile');
}
