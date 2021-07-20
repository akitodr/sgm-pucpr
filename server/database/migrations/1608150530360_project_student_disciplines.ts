import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ProjectStudentDisciplines extends BaseSchema {
  protected tableName = 'project_student_discipline';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('project_student_id');
      table.foreign('project_student_id')
        .references('id')
        .inTable('project_student')
        .onDelete('cascade');

      table.integer('discipline_id');
      table.foreign('discipline_id')
        .references('id')
        .inTable('disciplines')
        .onDelete('cascade');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
