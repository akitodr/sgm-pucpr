import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Course from 'App/Models/Course';

export default class CoursesController {
  public async index() {
    return await Course.all();
  }

  public async store({ request }: HttpContextContract) {
    const course = await Course.create(request.body());
    return course;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const course = await Course.findOrFail(id);
    return course;
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params;
    const course = await Course.findOrFail(id);

    course.merge(request.body());
    await course.save();
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;
    const course = await Course.findOrFail(id);
    await course.delete();
  }
}
