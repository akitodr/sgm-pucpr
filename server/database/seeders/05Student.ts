/**
 * Todos os dados foram gerados a partir do site:
 * https://www.4devs.com.br/gerador_de_pessoas
 */

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import fs from 'fs';
import StudentsModels from 'App/Models/Student';

export default class StudentSeeder extends BaseSeeder {
  public async run () {
    const studentsRaw = fs.readFileSync('files/students.json', 'utf8').split(';');
    for (let i = 0; i < studentsRaw.length; i++) {
      let students = JSON.parse(studentsRaw[i]);
      await StudentsModels.create({
        name: students.name,
        cpf: students.cpf,
        birthDate: students.data,
        phone: students.phone,
        email: students.email,
        institutionalEmail: students.institucional,
        status: students.status,
        isValid: students.valido,
        triedToUpdate: students.updt,
        schoolId: students.school,
        courseId: students.curso,
      });
    }
  }
}
