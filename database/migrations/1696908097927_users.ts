import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('name', 50).notNullable()
            table.string('phone_number').notNullable().unique()
            table.decimal('balance_yer', 10, 2).defaultTo(0.0).notNullable()
            table.decimal('balance_usd', 10, 2).defaultTo(0.0).notNullable()
            table.decimal('balance_sar', 10, 2).defaultTo(0.0).notNullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
