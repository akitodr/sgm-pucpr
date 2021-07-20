import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import fs from 'fs';
import School from 'App/Models/School';
import Course from 'App/Models/Course';

export default class SchoolsCoursesSeederSeeder extends BaseSeeder {
  public async run() {
    const schoolsCourses = fs.readFileSync('files/schools_courses.txt', 'utf8').split(',');

    for (let i = 0; i < schoolsCourses.length; i++) {
      const [ courseId, schoolId ] = schoolsCourses[i].split('.');
      const school = await School.findOrFail(schoolId);
      const course = await Course.findOrFail(courseId);
      await school.related('courses').save(course);
    }
  }
}
