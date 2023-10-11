import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 50).notNullable()
      table.string('phone_number').notNullable().unique()
      table.decimal('balance_YER', 10, 2).defaultTo(0.00)
      table.decimal('balance_USD', 10, 2).defaultTo(0.00)
      table.decimal('balance_SAR', 10, 2).defaultTo(0.00)
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
