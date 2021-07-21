import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  DatePicker,
} from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import { Store } from 'antd/lib/form/interface';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { Container } from './styles';

import ProjectStudents from '../../../../services/project-students.service';
import ProjectsService from '../../../../services/projects.service';

// import { Container } from './styles';

const FormStudentProject: React.FC = () => {
  interface ProjectStudent {
    id: number;
    project_id: number;
    student_id: number;
    teacher_id: number;
    term_code: string;
    term_id: number;
    pay_amount: string;
    start_date: string;
    modality: string;
    chr: number;
    chv: number;
    class_number: number;
    extraclass_number: number;
    type_of_service: string;
  }

  interface Teacher {
    id: number;
    name: string;
  }

  interface Discipline {
    id: number;
    name: string;
  }

  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;

  const validateMessages = {
    required: 'Campo Obrigatório',
    types: {
      email: '${label} inválido!',
      number: '${label} não é um número válido!',
    },
  };

  const [projectStudent, setProjectStudent] = useState<ProjectStudent>();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    ProjectStudents.show(id).then((response) => {
      const { data } = response;
      setProjectStudent({ ...data, start_date: moment(data.start_date) });
    });
  }, []);

  useEffect(() => {
    ProjectStudents.show(id).then((response) => {
      const { data } = response;
      ProjectsService.getDisciplines(data.project_id).then((res) => {
        setDisciplines(res.data);
      });
      ProjectsService.getTeachers(data.project_id).then((res) => {
        setTeachers(res.data);
      });
    });
  }, []);

  function createNewProjectStudent(values: Store) {
    ProjectStudents.create(
      values.teacher_id,
      values.term_code,
      values.term_id,
      values.pay_amount,
      values.start_date,
      values.modality,
      values.chr,
      values.chv,
      values.class_number,
      values.extraclass_number,
      values.type_of_service
    ).then((response) => {});
  }

  function editProjectStudent(values: Store) {
    ProjectStudents.update(
      id,
      values.teacher_id,
      values.term_code,
      values.term_id,
      values.pay_amount,
      values.start_date,
      values.modality,
      values.chr,
      values.chv,
      values.class_number,
      values.extraclass_number,
      values.type_of_service,
      values.disciplines
    ).then((response) => {});
  }

  function handleFinish(store: Store) {
    if (id) editProjectStudent(store);
    else createNewProjectStudent(store);
    console.log(store);
    history.goBack();
  }

  return (
    <DashboardLayout>
      <Container>
        {id ? <h2>Editar</h2> : <h2>Novo Cadastro</h2>}

        {(projectStudent || !id) && (
          <Form
            form={form}
            layout="vertical"
            name="nest-messages"
            onFinish={handleFinish}
            initialValues={projectStudent}
            validateMessages={validateMessages}
          >
            <div className="first-line">
              <Form.Item
                name="term_code"
                label="Código do Termo de Compromisso"
              >
                <Input />
              </Form.Item>
              <Form.Item name="term_id" label="Id do Termo de Compromisso">
                <Input />
              </Form.Item>
              <Form.Item name="pay_amount" label="Remuneração em R$">
                <Input
                  disabled
                  addonBefore="R$"
                />
              </Form.Item>
              <Form.Item name="start_date" label="Data de Início">
                <DatePicker
                  // defaultValue={moment('19/05/1222', 'DD-MM-YYYY')}
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
            <div className="second-line">
              <Form.Item name="modality" label="Modalidade">
                <Select
                  showSearch
                  placeholder="Selecione uma modalidade"
                  optionFilterProp="children"
                  // defaultValue="course_id"
                >
                  <Option value="Bolsista">Bolsista</Option>
                  <Option value="Voluntário">Voluntário</Option>
                  <Option value="Bolsista e Voluntário">
                    Bolsista e Voluntário
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item name="teacher_id" label="Orientador">
                <Select
                  showSearch
                  placeholder="Selecione um orintador"
                  defaultValue={[]}
                  optionFilterProp="children"
                >
                  {teachers.map((teacher) => (
                    <Option value={teacher.id} key={teacher.id}>
                      {teacher.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="third-line">
              <Form.Item name="chr" label="Carga horária remunerada">
                <InputNumber min={0} max={8} />
              </Form.Item>
              <Form.Item name="chv" label="Carga horária voluntária">
                <InputNumber min={0} max={8} />
              </Form.Item>
              <Form.Item name="class_number" label="Número da sala">
                <InputNumber min={0} max={8} />
              </Form.Item>
              <Form.Item name="extraclass_number" label="Número da extraclasse">
                <InputNumber min={0} max={8} />
              </Form.Item>
            </div>
            <div className="fourth-line">
              <Form.Item name="type_of_service" label="Forma de atendimento">
                <Select
                  showSearch
                  placeholder="Selecione uma modalidade"
                  optionFilterProp="children"
                >
                  <Option value="Sala de Aula">Sala de Aula</Option>
                  <Option value="Extraclasse">Extraclasse</Option>
                  <Option value="Sala de Aula+Extraclasse">
                    Sala de Aula+Extraclasse
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item name="disciplines" label="Disciplinas">
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  placeholder="Selecione uma modalidade"
                  defaultValue={[]}
                  optionFilterProp="children"
                >
                  {disciplines.map((discipline) => (
                    <Option value={discipline.id} key={discipline.id}>
                      {discipline.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="buttons-field">
              <Button type="primary" danger htmlType="reset">
                Cancelar
              </Button>
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

export default FormStudentProject;
