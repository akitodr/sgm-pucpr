import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProjectSubmissionTables extends BaseSchema {
  protected tableName = 'project_submission'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('campus').references('id').inTable('campuses')
      table.integer('school').references('id').inTable('schools')
      table.integer('course').references('id').inTable('courses')

      table.integer('estimated_qntd')
      table.integer('workload_qntd')
      table.string('workload_justify')
      table.integer('workload_extraclass_qntd')
      table.string('workload_extraclass_justify')
      table.integer('total')
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
