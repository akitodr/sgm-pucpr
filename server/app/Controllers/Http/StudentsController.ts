import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import StudentStoreValidator from '../../Validators/Student/StudentStoreValidator';
import Student from 'App/Models/Student';
import ImportStudents from '../../Utils/ImportStudents';
import Application from '@ioc:Adonis/Core/Application';
import fs from 'fs';

export default class StudentsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1);
    const perPage = request.input('perPage', 10);
    const { term } = request.qs();

    const query = Student.query();

    if (term) {
      query.where('name', 'ilike', `%${term}%`);
    }
    query.orderBy('name');
    return await query.paginate(page, perPage);
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StudentStoreValidator);
    const student = await Student.create(data);
    return student;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const student = await Student.findOrFail(id);
    await student.load('school');
    await student.load('course');
    return student;
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(StudentStoreValidator);
    const { id } = params;
    const student = await Student.findOrFail(id);
    student.merge(data);
    await student.save();
    return student;
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;
    const student = await Student.findOrFail(id);
    await student.delete();
  }

  public async import({ request, response }: HttpContextContract) {
    const file = request.file('file');
    try {
      await file?.move(Application.tmpPath('upload'));
      if (file?.filePath) {
        await ImportStudents(file.filePath);
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
