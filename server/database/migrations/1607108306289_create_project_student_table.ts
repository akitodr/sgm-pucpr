import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class CreateProjectStudentTables extends BaseSchema {
  protected tableName = 'project_student';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('project_id').notNullable();
      table.foreign('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('cascade');

      table.integer('student_id').notNullable();
      table.foreign('student_id')
        .references('id')
        .inTable('students')
        .onDelete('cascade');

      table.integer('teacher_id').nullable();
      table.foreign('teacher_id')
        .references('id')
        .inTable('teachers')
        .onDelete('cascade');

      table.string('term_code').nullable();
      table.integer('term_id').nullable();
      table.string('pay_amount');
      table.date('start_date');
      table.string('modality');
      table.integer('chr');
      table.integer('chv');
      table.integer('class_number');
      table.integer('extraclass_number');
      table.string('type_of_service');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
