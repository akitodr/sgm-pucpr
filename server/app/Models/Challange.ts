import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ProjectSubmission from './ProjectSubmission'

export default class Challange extends BaseModel {
  public static table = 'tb_chllanges'

  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => ProjectSubmission)
  public id_project: BelongsTo<typeof ProjectSubmission>

  @column()
  public value: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
