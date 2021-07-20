import Course from 'App/Models/Course';
import Discipline from 'App/Models/Discipline';
import Project from 'App/Models/Project';
import School from 'App/Models/School';
import Teacher from 'App/Models/Teacher';
import xlsx from 'xlsx';

export default async function importProjects(filePath: string) {
  const workbook = xlsx.readFile(filePath, { cellDates: true });

  const workspaceProject = workbook.Sheets[workbook.SheetNames[0]];
  const workspaceTeacher = workbook.Sheets[workbook.SheetNames[2]];

  const dataProject: Object[] = xlsx.utils.sheet_to_json(workspaceProject, {
    header: 1,
    blankrows: false,
  });

  const dataTeacher: Object[] = xlsx.utils.sheet_to_json(workspaceTeacher, {
    header: 1,
    blankrows: false,
  });

  const projectCode: string = dataProject[2][0].toString().toUpperCase().trim();

  let project = await Project.findBy('code', projectCode);
  if (!project) {
    project = await Project.create({ code: projectCode });
  }

  for (let index = 2; index < dataProject.length; index++) {
    const name = dataProject[index][1]
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    let code = dataProject[index][2];
    !code ? (code = '') : (code = code.toString().toUpperCase().trim());
    let hours = dataProject[index][3];
    !hours ? (hours = '') : (hours = hours.toString().toLowerCase().trim());

    let discipline = await Discipline.findBy('name', name);
    if (!discipline) {
      await Discipline.create({
        name,
        code,
        hours,
        projectId: project.id,
      });
    } else {
      discipline.merge({ projectId: project.id });
      await discipline.save();
    }
  }

  const teachers: Teacher[] = [];

  for (let index = 2; index < dataTeacher.length; index++) {
    let [name, code, email, phone_code, phone, course, school] = dataTeacher[
      index
    ];

    if (name === undefined) {
      continue;
    }

    name = name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    !code ? (code = '') : (code = code.toString().trim());
    !email ? (email = '') : (email = email.toString().trim().toLowerCase());
    !phone_code
      ? (phone_code = '')
      : (phone_code = phone_code.toString().trim());
    !phone
      ? (phone = '')
      : (phone =
          phone_code +
          phone.toString().trim().replace(' ', '').replace('-', ''));
    !course
      ? (course = '')
      : (course = course
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())));
    !school
      ? (school = '')
      : (school = school
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())));

    const courseTest = await Course.query()
      .where('name', 'ilike', course)
      .first();
    let courseId: number | undefined;
    if (courseTest) {
      courseId = courseTest!.id;
    }

    const schoolTest = await School.query()
      .where('name', 'ilike', school)
      .first();
    let schoolId : number | undefined;
    if (schoolTest) {
      schoolId = schoolTest!.id;
    }

    let teacher = await Teacher.findBy('name', name);
    if (!teacher) {
      teacher = await Teacher.create({
        name,
        code,
        email,
        phone,
        schoolId,
        courseId,
      });
    } else {
      teacher.merge({ triedToUpdate: true });
      await teacher.save();
    }

    teachers.push(teacher);
  }
  await project.related('teachers').attach(teachers.map((_) => _.id));
}
