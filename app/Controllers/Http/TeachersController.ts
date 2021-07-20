import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Teacher from 'App/Models/Teacher';
import ImportTeachers from '../../Utils/ImportTeachers';
import Application from '@ioc:Adonis/Core/Application';
import fs from 'fs';

export default class TeachersController {
  public async index({request}: HttpContextContract) {
    const page = request.input('page', 1);
    const perPage = request.input('perPage', 10);
    const { term } = request.qs();

    const query = Teacher.query();

    if(term) {
      query.where('name', 'ilike', `%${term}%`);
    }
    query.orderBy('name');
    return await query.paginate(page, perPage);
  }

  public async store({request}: HttpContextContract) {
    const teacher = await Teacher.create(request.body());
    return teacher;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const teacher = await Teacher.findOrFail(id);
    await teacher.load('school');
    await teacher.load('course');
    return teacher;
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params;
    const teacher = await Teacher.findOrFail(id);
    teacher.merge(request.body());
    await teacher.save();
    return teacher;
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;
    const teacher = await Teacher.findOrFail(id);
    await teacher.delete();
  }

  public async import({ request, response }: HttpContextContract) {
    const file = request.file('file');
    try {
      await file?.move(Application.tmpPath('upload'));
      if (file?.filePath) {
        await ImportTeachers(file.filePath);
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
