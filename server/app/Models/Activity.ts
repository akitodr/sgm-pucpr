import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ProjectSubmission from './ProjectSubmission'

export default class Activity extends BaseModel {
  public static table = 'tb_activities'

  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => ProjectSubmission)
  public id_project: BelongsTo<typeof ProjectSubmission>

  @column({columnName: 'value'})
  public value: JSON

  @column()
  public line: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
