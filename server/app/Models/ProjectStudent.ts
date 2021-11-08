import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';
import Student from './Student';
import Teacher from './Teacher';
import Discipline from './Discipline';

export default class ProjectStudent extends BaseModel {
  public static table = 'project_student';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public projectId: number;

  @belongsTo(() => Project)
  public project : BelongsTo<typeof Project>;

  @column()
  public studentId: number;

  @belongsTo(() => Student)
  public student : BelongsTo<typeof Student>;

  @column()
  public teacherId: number;

  @belongsTo(() => Teacher)
  public teacher: BelongsTo<typeof Teacher>;

  @column()
  public termCode: string;

  @column()
  public termId: number;

  @column()
  public payAmount: string;

  @column.date()
  public startDate: DateTime;

  @column()
  public modality: string;

  @column()
  public chr: number;

  @column()
  public chv: number;

  @column()
  public classNumber: number;

  @column()
  public extraclassNumber: number;

  @column()
  public typeOfService: string;

  @manyToMany(() => Discipline, {pivotTable: 'project_student_discipline'})
  public disciplines: ManyToMany<typeof Discipline>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}