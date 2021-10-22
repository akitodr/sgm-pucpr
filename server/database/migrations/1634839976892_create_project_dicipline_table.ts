import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProjectDiciplines extends BaseSchema {
  protected tableName = 'project_dicipline'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Foreing Keys
      table.integer('id_project').references('id').inTable('project_submission')
      table.integer('id_discipline').references('id').inTable('disciplines')
      table.integer('id_course').references('id').inTable('courses')

      table.string('dicipline_name')
      table.string('code')
      table.integer('workload')
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
