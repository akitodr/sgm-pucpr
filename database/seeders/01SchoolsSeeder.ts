import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import fs from 'fs';
import School from 'App/Models/School';

export default class SchoolsSeederSeeder extends BaseSeeder {
  public async run() {
    const schools = fs.readFileSync('files/schools.txt', 'utf8').split(',');

    for (let i = 0; i < schools.length; i++) {
      const [ schoolName, campusId ] = schools[i].split('.');
      await School.create({ name: schoolName, campusId: Number(campusId) });
    }
  }
}
