import { DateTime } from 'luxon';
import Student from 'App/Models/Student';
import Course from 'App/Models/Course';
import School from 'App/Models/School';
import xlsx from 'xlsx';
import Project from 'App/Models/Project';
import ProjectStudent from 'App/Models/ProjectStudent';

function payAmount(value: number) {
  switch (value) {
    case 2:
      return '114,00';
    case 4:
      return '226,00';
    case 6:
      return '342,00';
    case 8:
      return '456,00';
    default:
      return '0,00';
  }
}

export default async function importStudent(filePath: string) {
  const workbook = xlsx.readFile(filePath, { cellDates: true });

  const workspace = workbook.Sheets[workbook.SheetNames[0]];

  const data = xlsx.utils.sheet_to_json(workspace, {
    header: 1,
    blankrows: false,
  });

  for (let index = 1; index < data.length; index++) {
    let [
      project,
      start_date,
      name,
      cpf,
      birth_date,
      phone,
      email,
      institutionalEmail,
      school,
      course,
      status,
      modality,
      chr,
      chv,
      class_number,
      extraclass_number,
      type_of_service,
      discipline,
      teacher,
    ] = data[index];

    project = project.trim();
    name = name
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    cpf = cpf.toString().trim().replace(/\./g, '').replace('-', '');
    phone = phone.toString().trim();
    email = email.trim().toLowerCase();
    institutionalEmail = institutionalEmail.trim().toLowerCase();
    school = school
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    course = course
      .trim()
      .toLowerCase()
      .replace(/\u00A0/g, ' ')
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    status = status
      .trim()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    modality = modality.trim();
    type_of_service = type_of_service.trim();
    discipline = discipline.trim();
    teacher = teacher
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

    let student = await Student.findBy('cpf', cpf);
    if(!student) {
      student = await Student.create({
        name,
        cpf,
        birthDate: DateTime.fromJSDate(birth_date),
        phone,
        email,
        institutionalEmail,
        status,
        schoolId,
        courseId,
      });
    }

    const existingProject = await Project.findBy('code', project);
    if(existingProject) {
      await ProjectStudent.create({
        projectId: existingProject.id,
        studentId: student.id,
        payAmount: payAmount(chr),
        startDate: DateTime.fromJSDate(start_date),
        modality,
        chr,
        chv,
        classNumber: class_number,
        extraclassNumber: extraclass_number,
        typeOfService: type_of_service,
      });
    }
  }
}
