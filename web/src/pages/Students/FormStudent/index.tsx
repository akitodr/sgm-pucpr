import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { useParams, Link, useHistory } from 'react-router-dom';
import moment from 'moment';

import { Store } from 'antd/lib/form/interface';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Container } from './styles';

import SchoolService from '../../../services/schools.service';
import StudentService from '../../../services/student.service';

const FormStudent: React.FC = () => {
  interface Course {
    id: number;
    name: string;
    school_id?: number;
  }

  interface School {
    id: number;
    name: string;
    campus_id: number;
  }

  interface Student {
    id: number;
    name: string;
    cpf: string;
    birth_date: string;
    phone: string;
    email: string;
    institutional_email: string;
    status: string;
    school_id: number;
    course_id: number;
  }

  const history = useHistory();

  const { Option } = Select;

  const [courses, setCourses] = useState<Course[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [student, setStudent] = useState<Student>();

  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    SchoolService.get().then((response) => {
      setSchools(response.data);
    });
    if (id) {
      StudentService.getId(Number(id)).then((response) => {
        const { data } = response;
        setStudent({ ...data, birth_date: moment(data.birth_date) });
        SchoolService.getCourses(data.school_id).then((resp) => {
          setCourses(resp.data);
        });
      });
    }
  }, []);

  // useEffect(() => {
  //   if (courses.length) form.setFieldsValue({ course_id: courses[0].id });
  // }, [courses]);

  const validateMessages = {
    required: 'Campo Obrigatório',
    types: {
      email: '${label} inválido!',
      number: '${label} não é um número válido!',
    },
  };

  function createNewStudent(values: Store) {
    StudentService.create(
      values.name,
      values.cpf,
      values.birth_date,
      values.phone,
      values.email,
      values.institutional_email,
      values.status,
      values.school_id,
      values.course_id
    ).then((response) => {
      
    });
  }

  function editStudent(values: Store) {
    StudentService.update(
      id,
      values.name,
      values.cpf,
      values.birth_date,
      values.phone,
      values.email,
      values.institutional_email,
      values.status,
      values.school_id,
      values.course_id
    ).then((response) => {
      
    });
  }

  function handleFinish(store: Store) {
    if (id) editStudent(store);
    else createNewStudent(store);
    history.push('/students');
  }

  function loadSchoolCourses(schoolId: number) {
    SchoolService.getCourses(schoolId).then((response) => {
      setCourses(response.data);
      if (response.data.length)
        form.setFieldsValue({ course_id: response.data[0].id });
    });
  }

  return (
    <DashboardLayout>
      <Container>
        {id ? <h2>Editar</h2> : <h2>Novo Cadastro</h2>}

        {(student || !id) && (
          <Form
            form={form}
            layout="vertical"
            name="nest-messages"
            onFinish={handleFinish}
            initialValues={student}
            validateMessages={validateMessages}
          >
            <div className="user-name">
              <Form.Item
                name="status"
                label="Status"
              >
                <Select
                  showSearch
                  placeholder="Selecione um Status"
                  optionFilterProp="children"
                  // defaultValue="course_id"
                >
                  <Option value="Novo">Novo</Option>
                  <Option value="Recondução">Recondução</Option>
                </Select>
              </Form.Item>
              <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>
            <div className="user-information">
              <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="birth_date"
                label="Data de Nascimento"
                rules={[{ required: true }]}
              >
                <DatePicker
                  // defaultValue={moment('19/05/1222', 'DD-MM-YYYY')}
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Telefone"
              >
                <Input />
              </Form.Item>
            </div>
            <div className="user-email">
              <Form.Item
                name="email"
                label="E-mail"
                rules={[{ type: 'email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="institutional_email"
                label="E-mail Institucional"
                rules={[{ type: 'email' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="user-school-course">
              <Form.Item
                name="school_id"
                label="Escola"
              >
                <Select
                  showSearch
                  placeholder="Selecione uma Escola"
                  optionFilterProp="children"
                  onChange={(value) => loadSchoolCourses(value as number)}
                  // defaultValue="school_id"
                >
                  {schools.map((school) => (
                    <Option key={school.id} value={school.id}>
                      {school.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="course_id"
                label="Curso"
              >
                <Select
                  showSearch
                  placeholder="Selecione um Curso"
                  optionFilterProp="children"
                  // defaultValue="course_id"
                >
                  {courses.map((course) => (
                    <Option key={course.id} value={course.id}>
                      {course.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="buttons-field">
              <Link to="/students">
                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                  onClick={(value) => console.log(student)}
                >
                  Cancelar
                </Button>
              </Link>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default FormStudent;
