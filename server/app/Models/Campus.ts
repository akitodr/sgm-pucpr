import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import School from './School';

export default class Campus extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @hasMany(() => School)
  public schools: HasMany<typeof School>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
