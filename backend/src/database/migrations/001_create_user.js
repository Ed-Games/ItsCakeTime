exports.up = function(Knex){
    return Knex.schema.createTable('user', function(table){
        table.increments().primary();
        table.string('userName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('refreshToken');
        table.string('requestPasswdToken');
        table.date('expirationDate')
        table.unique(['userName','email','refreshToken', 'requestPasswdToken']);

})};

exports.down = function(Knex){
    return Knex.schema.dropTable('user');
}