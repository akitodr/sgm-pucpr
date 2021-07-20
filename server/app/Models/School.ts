import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Campus from './Campus';
import Course from './Course';

export default class School extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public campusId: number;

  @belongsTo(() => Campus)
  public campus: BelongsTo<typeof Campus>;

  @manyToMany(() => Course)
  public courses: ManyToMany<typeof Course>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
