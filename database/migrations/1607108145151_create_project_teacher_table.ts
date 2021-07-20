import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class CreateProjectTeacherTables extends BaseSchema {
  protected tableName = 'project_teacher';
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('project_id').notNullable();
      table.foreign('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('cascade');

      table.integer('teacher_id').notNullable();
      table.foreign('teacher_id')
        .references('id')
        .inTable('teachers')
        .onDelete('cascade');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
