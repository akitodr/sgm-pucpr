import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjectSubmission from 'App/Models/ProjectSubmission'

export default class ProjectSubmissionController {
  public async index (){
    return await ProjectSubmission.all()
  }

  public async store ({request}: HttpContextContract){
    const proj = await ProjectSubmission.create(request.body())
    return proj
  }
}
