import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Project from 'App/Models/Project';
import importProjects from 'App/Utils/ImportProjects';
import Application from '@ioc:Adonis/Core/Application';
import fs from 'fs';
import ProjectStudent from 'App/Models/ProjectStudent';

export default class ProjectsController {
  public async index({request}: HttpContextContract) {
    const page = request.input('page');
    const perPage = request.input('perPage', 10);
    const { term } = request.qs();

    const query = Project.query();

    if(term) {
      query.where('code', 'ilike', `%${term}%`);
    }
    query.orderBy('code');
    return page ? await query.paginate(page, perPage) : await query.exec();
  }

  public async store({ request }: HttpContextContract) {
    const project = await Project.create(request.body());
    return project;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const project = await Project.findOrFail(id);
    return project;
  }

  public async update({ request, params}: HttpContextContract) {
    const { id } = params;
    const project = await Project.findOrFail(id);

    project.merge(request.body());
    return project;
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;
    const project = await Project.findOrFail(id);
    await project.delete();
  }

  public async getStudents({ params }: HttpContextContract) {
    const students = await ProjectStudent.query()
      .where('project_id', params.id)
      .preload('student')
      .exec();
    return students;
  }

  public async getTeachers({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id);
    await project.load('teachers');
    return project.teachers;
  }

  public async getDisciplines({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id);
    await project.load('disciplines');
    return project.disciplines;
  }

  public async import({ request, response }: HttpContextContract) {
    const file = request.file('file');
    try {
      await file?.move(Application.tmpPath('upload'));
      if (file?.filePath) {
        await importProjects(file.filePath);
      }
    } catch (error) {
      response.status(400).json({ message: error.message });
    } finally {
      if (file?.filePath) {
        fs.unlinkSync(file.filePath);
      }
    }
  }
}
