import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ProjectSubmission from './ProjectSubmission'

export default class Strategy extends BaseModel {
  public static table = 'tb_strategies'

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
