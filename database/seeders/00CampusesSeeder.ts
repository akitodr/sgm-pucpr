import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Campus from 'App/Models/Campus';
import fs from 'fs';

export default class CampusesSeederSeeder extends BaseSeeder {
  public async run() {
    const campuses = fs.readFileSync('files/campuses.txt', 'utf8').split(',');

    for (let i = 0; i < campuses.length; i++) {
      await Campus.create({ name: campuses[i] });
    }
  }
}
