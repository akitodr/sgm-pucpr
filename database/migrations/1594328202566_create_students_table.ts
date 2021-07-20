import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class CreateStudentsTables extends BaseSchema {
  protected tableName = 'students';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();
      table.string('cpf').notNullable();
      table.date('birth_date').notNullable();
      table.string('phone').notNullable();
      table.string('email').nullable();
      table.string('institutional_email').nullable();
      table.string('status').notNullable();
      table.boolean('is_valid').notNullable().defaultTo(true);
      table.boolean('tried_to_update').notNullable().defaultTo(false);

      table.integer('school_id');
      table.foreign('school_id')
        .references('id')
        .inTable('schools');

      table.integer('course_id');
      table.foreign('course_id')
        .references('id')
        .inTable('courses');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
