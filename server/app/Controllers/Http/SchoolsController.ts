import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import School from 'App/Models/School';

export default class SchoolsController {
  public async index({ request }: HttpContextContract) {
    const { campus_id } = request.qs();
    const query = School.query();

    if(campus_id) {
      query
        .join('campus_school', 'campus_school.school_id', 'schools.id')
        .where('campus_school.campus_id', campus_id)
        .select('schools.*');
    }

    return await query.exec();
  }

  public async store({ request }: HttpContextContract) {
    const school = await School.create(request.body());
    return school;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const school = await School.findOrFail(id);
    return school;
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params;
    const school = await School.findOrFail(id);

    school.merge(request.body());
    await school.save();
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;
    const school = await School.findOrFail(id);
    await school.delete();
  }

  public async getCourses({ params }: HttpContextContract) {
    const school = await School.findOrFail(params.id);
    await school.load('courses');
    return school.courses;
  }

  public async addCourse({ params, request }: HttpContextContract) {
    const school = await School.findOrFail(params.id);
    const { courseId } = request.body();

    await school.related('courses').attach([courseId]);
  }

  public async deleteCourse({ params, request }: HttpContextContract) {
    const school = await School.findOrFail(params.id);
    const { courseId } = request.body();

    await school.related('courses').detach([courseId]);
  }
}
