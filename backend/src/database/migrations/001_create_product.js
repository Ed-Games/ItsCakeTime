exports.up = function(Knex){
    return Knex.schema.createTable('product', function(table){
        table.increments().primary();
        table.string('name').notNullable();
        table.string('detail').notNullable();
        table.string('category').defaultTo('Não categorizado');
        table.string('image').notNullable();
        table.decimal('price').notNullable();
        table.decimal('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('user');

})};

exports.down = function(Knex){
    return Knex.schema.dropTable('product');
}