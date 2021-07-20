import Course from 'App/Models/Course';
import School from 'App/Models/School';
import Teacher from 'App/Models/Teacher';
import xlsx from 'xlsx';

export default async function importStudent(filePath: string) {
  const workbook = xlsx.readFile(filePath, { cellDates: true });

  const workspace = workbook.Sheets[workbook.SheetNames[2]];

  const data = xlsx.utils.sheet_to_json(workspace, {
    header: 1,
    blankrows: false,
  });

  for (let index = 2; index < data.length; index++) {
    let [name, code, email, phone_code, phone, course, school] = data[index];
    name = name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    code = code.toString().trim();
    email = email.toString().trim().toLowerCase();
    phone_code = phone_code.toString().trim();
    phone =
      phone_code + phone.toString().trim().replace(' ', '').replace('-', '');
    course = course
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    school = school
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    const courseTest = await Course.query()
      .where('name', 'ilike', course)
      .first();
    const courseId = courseTest!.id;
    const schoolTest = await School.query()
      .where('name', 'ilike', school)
      .first();
    const schoolId = schoolTest!.id;

    await Teacher.create({
      name,
      code,
      email,
      phone,
      schoolId,
      courseId,
    });
  }
}
