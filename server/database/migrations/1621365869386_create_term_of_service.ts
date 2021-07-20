import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTermOfServices extends BaseSchema {
  protected tableName = 'term_of_services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable();
      table.string('cpf').notNullable();
      table.date('birth_date').notNullable();
      table.string('registration').notNullable();
      table.string('phone').notNullable();
      table.string('email').notNullable();
      table.string('institutional_email').notNullable();
      table.boolean('status').notNullable();
      table.integer('paid_workload').notNullable();
      table.integer('voluntary_workload').notNullable();
      table.integer('class_workload').notNullable();
      table.integer('extraclass_workload').notNullable();

      table.integer('school_id').notNullable();
      table.foreign('school_id')
        .references('id')
        .inTable('schools');

      table.integer('course_id').notNullable();
      table.foreign('course_id')
        .references('id')
        .inTable('courses');

      table.integer('project_id').notNullable();
      table.foreign('project_id')
        .references('id')
        .inTable('projects');

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
