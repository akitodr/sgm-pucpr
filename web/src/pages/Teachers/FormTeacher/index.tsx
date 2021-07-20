import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useParams, Link, useHistory } from 'react-router-dom';

import { Store } from 'antd/lib/form/interface';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Container } from './styles';

import SchoolService from '../../../services/schools.service';
import TeacherService from '../../../services/teachers.service';

// import { Container } from './styles';

const FormTeacher: React.FC = () => {
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

  interface Teacher {
    id: number;
    name: string;
    code: string;
    email: string;
    phone: string;
    course_id: number;
    school_id: number;
  }

  const history = useHistory();

  const { Option } = Select;

  const [courses, setCourses] = useState<Course[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [teacher, setTeacher] = useState<Teacher>();

  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    SchoolService.get().then((response) => {
      setSchools(response.data);
    });
    if (id) {
      TeacherService.getId(Number(id)).then((response) => {
        const { data } = response;
        setTeacher(data);
        SchoolService.getCourses(data.school_id).then((resp) => {
          setCourses(resp.data);
        });
      });
    }
  }, []);

  const validateMessages = {
    required: 'Campo Obrigatório',
    types: {
      email: '${label} inválido!',
      number: '${label} não é um número válido!',
    },
  };

  function createNewTeacher(values: Store) {
    TeacherService.create(
      values.name,
      values.code,
      values.email,
      values.phone,
      values.course_id,
      values.school_id
    ).then((response) => {
      
    });
  }

  function editTeacher(values: Store) {
    TeacherService.update(
      id,
      values.name,
      values.code,
      values.email,
      values.phone,
      values.course_id,
      values.school_id
    ).then((response) => {
      
    });
  }

  function handleFinish(store: Store) {
    if (id) editTeacher(store);
    else createNewTeacher(store);
    history.push('/teachers');
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

        {(teacher || !id) && (
          <Form
            form={form}
            layout="vertical"
            name="nest-messages"
            onFinish={handleFinish}
            initialValues={teacher}
            validateMessages={validateMessages}
          >
            <div className="user-name">
              <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>
            <div className="user-information">
              <Form.Item
                name="code"
                label="Código RH"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Telefone"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="user-email">
              <Form.Item
                name="email"
                label="E-mail"
                rules={[{ type: 'email', required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="user-school-course">
              <Form.Item
                name="school_id"
                label="Escola"
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
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
              <Link to="/teachers">
                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                  onClick={(value) => console.log(teacher)}
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

export default FormTeacher;
