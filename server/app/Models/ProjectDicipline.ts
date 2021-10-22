import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ProjectSubmission from './ProjectSubmission'
import Discipline from './Discipline'
import Course from './Course'

export default class ProjectDicipline extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => ProjectSubmission)
  public id_project: BelongsTo<typeof ProjectSubmission>

  @hasMany(() => Discipline)
  public id_dicipline: HasMany<typeof Discipline>

  @hasMany(() => Course)
  public id_course: HasMany<typeof Course>

  // Collumns
  @column()
  public discipline_name: string

  @column()
  public code: string

  @column()
  public workload: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
