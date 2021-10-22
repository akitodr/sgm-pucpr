import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ProjectSubmission from './ProjectSubmission'
import Teacher from './Teacher'

export default class ProjectTeacher extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Belongs To
  @belongsTo(() => ProjectSubmission)
  public project: BelongsTo<typeof ProjectSubmission>

  // Has Many
  @hasMany(() => Teacher)
  public teacher: HasMany<typeof Teacher>

  // Collumns
  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
