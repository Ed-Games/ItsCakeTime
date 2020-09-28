exports.up = function(Knex){
    return Knex.schema.createTable('user', function(table){
        table.increments().primary();
        table.string('userName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.unique(['userName','email']);

})};

exports.down = function(Knex){
    return Knex.schema.dropTable('user');
}