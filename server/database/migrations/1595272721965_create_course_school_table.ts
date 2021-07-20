import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class CreateSchoolsCoursesTables extends BaseSchema {
  protected tableName = 'course_school';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('course_id').notNullable();
      table.foreign('course_id')
        .references('id')
        .inTable('courses')
        .onDelete('cascade');

      table.integer('school_id').notNullable();
      table.foreign('school_id')
        .references('id')
        .inTable('schools')
        .onDelete('cascade');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
