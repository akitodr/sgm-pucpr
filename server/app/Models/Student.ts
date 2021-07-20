import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, beforeSave, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import { cpf } from 'cpf-cnpj-validator';
import Course from './Course';
import School from './School';
import Project from './Project';

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column.date()
  public birthDate: DateTime;

  @column()
  public phone: string;

  @column()
  public email: string;

  @column()
  public institutionalEmail: string;

  @column()
  public status: string;

  @column()
  public isValid: boolean;

  @column()
  public triedToUpdate: boolean;

  @column()
  public schoolId: number;

  @belongsTo(() => School)
  public school: BelongsTo<typeof School>;

  @column()
  public courseId: number;

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>;

  @manyToMany(() => Project)
  public projects: ManyToMany<typeof Project>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async validate(student: Student) {
    student.isValid = cpf.isValid(student.$dirty.cpf);
  }
}
