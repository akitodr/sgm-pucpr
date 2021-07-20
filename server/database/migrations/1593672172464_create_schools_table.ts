import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class CreateSchoolsTables extends BaseSchema {
  protected tableName = 'schools';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name', 255).notNullable();

      table.integer('campus_id');
      table.foreign('campus_id')
        .references('id')
        .inTable('campuses');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
