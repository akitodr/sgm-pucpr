import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProjectsubmissionTables extends BaseSchema {
  protected tableName = 'project_submission'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('campus_id').references('id').inTable('campuses')
      table.integer('schools_id').references('id').inTable('schools')
      table.integer('courses_id').references('id').inTable('courses')

      table.json('teachers_id')
      table.json('disciplines_id')

      table.integer('students_amount')
      table.string('students_justification')
      table.integer('chc_amount')
      table.string('chc_justification')
      table.integer('che_amount')
      table.string('che_justification')
      table.integer('total')

      table.string('characteristics_justification')
      table.string('challanges_justification')

      table.json('strategies')
      table.json('challanges')
      table.json('activities')

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
