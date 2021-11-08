import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Campus from './Campus'
import School from './School'
import Course from './Course'

export default class ProjectSubmission extends BaseModel {
  public static table = 'project_submission'

  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Campus)
  public campus: HasOne<typeof Campus>

  @hasOne(() => School)
  public schools: HasOne<typeof School>

  @hasOne(() => Course)
  public courses: HasOne<typeof Course>

  @column()
  public campus_id: number

  @column()
  public schools_id: number

  @column()
  public courses_id: number

  @column()
  public students_amount: number

  @column()
  public students_justification: string

  @column()
  public chc_amount: number

  @column()
  public chc_justification: string

  @column()
  public che_amount: number

  @column()
  public che_justification: string

  @column()
  public total: number

  @column()
  public teachers_id: JSON

  @column()
  public disciplines_id: JSON

  @column()
  public characteristics_justification: string

  @column()
  public challanges_justification: string

  @column()
  public strategies: JSON

  @column()
  public challanges: JSON

  @column()
  public activities: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
