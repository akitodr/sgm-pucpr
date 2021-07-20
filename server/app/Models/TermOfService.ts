import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import School from './School';
import { BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Course from './Course';
import Project from './Project';

export default class TermOfService extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column.date()
  public birthDate: DateTime;

  @column()
  public registration: string;

  @column()
  public phone: string;

  @column()
  public email: string;

  @column()
  public institutionalEmail: string;

  @column()
  public status: boolean;

  @column()
  public paidWorkload: number;

  @column()
  public voluntaryWorkload: number;

  @column()
  public classWorkload: number;

  @column()
  public extraclassWorkload: number;

  @column()
  public schoolId: number;

  @belongsTo(() => School)
  public school: BelongsTo<typeof School>;

  @column()
  public courseId: number;

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>;

  @column()
  public projectId: number;

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
