import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProjectTeachersTables extends BaseSchema {
  protected tableName = 'project_teachers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('id_project').references('id').inTable('project_submission')
      table.integer('id_teachers').references('id').inTable('teachers')

      table.string('name')
      table.string('email')
      table.string('phone')
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
