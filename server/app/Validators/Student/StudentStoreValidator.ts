import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class StudentStoreValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.alpha({
        allow: ['space'],
      }),
    ]),
    cpf: schema.string({}, [
      rules.unique({ table: 'students', column: 'cpf' }),
    ]),
    birth_date: schema.date(),
    phone: schema.string(),
    email: schema.string.optional({}, [
      rules.email({
        sanitize: true,
      }),
    ]),
    institutional_email: schema.string.optional({}, [
      rules.email({
        sanitize: true,
      }),
    ]),
    status: schema.string(),
    school_id: schema.number(),
    course_id: schema.number(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {};
}
