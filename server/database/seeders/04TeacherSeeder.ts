/**
 * Todos os dados foram gerados a partir do site:
 * https://www.4devs.com.br/gerador_de_pessoas
 */

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import fs from 'fs';
import Teacher from 'App/Models/Teacher';

export default class TeacherSeederSeeder extends BaseSeeder {

  
  public async run () {
    const teachersRaw = fs.readFileSync('files/teachers.json', 'utf8').split(';');
    for (let i = 0; i < teachersRaw.length; i++) {
      let teachers = JSON.parse(teachersRaw[i]);
      await Teacher.create({
        name: teachers.name,
        code: teachers.code,
        email: teachers.email,
        phone: teachers.phone,
        courseId: teachers.course, 
        schoolId: teachers.school,
        triedToUpdate: teachers.updt,
      });
    }
  }
}
