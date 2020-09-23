exports.up = function(Knex){
    return Knex.schema.createTable('user', function(table){
        table.string('id').primary();
        table.string('userName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();

})};

exports.down = function(Knex){
    return Knex.schema.dropTable('user');
}