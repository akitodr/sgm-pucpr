import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import Discipline from './Discipline';
import Student from './Student';
import Teacher from './Teacher';

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public code: string;

  @hasMany(() => Discipline)
  public disciplines: HasMany<typeof Discipline>;

  @manyToMany(() => Student)
  public students: ManyToMany<typeof Student>;

  @manyToMany(() => Teacher)
  public teachers: ManyToMany<typeof Teacher>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
