import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';
import ProjectStudent from './ProjectStudent';

export default class Discipline extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public code: string;

  @column()
  public hours: string;

  @column()
  public projectId: number;

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>;

  @manyToMany(() => ProjectStudent)
  public projectStudents: ManyToMany<typeof ProjectStudent>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
