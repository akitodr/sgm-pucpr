import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Campus from './Campus'
import School from './School'
import Course from './Course'
import Teacher from './Teacher'

export default class ProjectSubmission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Belongs To
  @belongsTo(() => Campus)
  public campus: BelongsTo<typeof Campus>

  @belongsTo(() => School)
  public school: BelongsTo<typeof School>

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  // HasMany:

  // Columns:
  @column()
  public estimated_qntd: number

  @column()
  public workload_qntd: number

  @column()
  public workload_justify: string

  @column()
  public workdload_extraclass_qntd: number

  @column()
  public workload_extraclass_justify: string

  @column()
  public total_hours: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
