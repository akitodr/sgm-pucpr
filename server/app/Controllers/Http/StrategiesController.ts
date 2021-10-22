import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjectSubmission from 'App/Models/ProjectSubmission'
import Strategy from 'App/Models/Strategy'

export default class StrategiesController {
  public async index(){
    const response = await ProjectSubmission.all()
    const strategies = await Strategy.all()
    return {result: response, strategies: strategies}
  }
}
