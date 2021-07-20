import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import fs from 'fs';
import Course from 'App/Models/Course';

export default class CoursesSeederSeeder extends BaseSeeder {
  public async run() {
    const courses = fs.readFileSync('files/courses.txt', 'utf8').split(',');
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i].replace(/\u00A0/g, ' ');
      await Course.create({ name: course });
    }
  }
}
