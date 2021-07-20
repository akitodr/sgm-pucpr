import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Discipline from 'App/Models/Discipline';

export default class DisciplinesController {
  public async index() {
    return await Discipline.all();
  }

  public async store({ request }: HttpContextContract) {
    const discipline = await Discipline.create(request.body());
    return discipline;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const discipline = await Discipline.findOrFail(id);
    return discipline;
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params;
    const discipline = await Discipline.findOrFail(id);

    discipline.merge(request.body());
    await discipline.save();
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;
    const discipline = await Discipline.findOrFail(id);
    await discipline.delete();
  }
}
