import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateChallangesTables extends BaseSchema {
  protected tableName = 'tb_challanges'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('id_project').references('id').inTable('project_submission')

      table.string('value')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
