import { DateTime } from 'luxon';
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import School from './School';

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @manyToMany(() => School)
  public schools: ManyToMany<typeof School>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
