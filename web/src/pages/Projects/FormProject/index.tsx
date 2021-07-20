import React, { useEffect, useState } from 'react';

import { Tabs, Table, Form, Input, Button, Select, InputNumber } from 'antd';
import { MdEdit } from 'react-icons/md';

import { Store } from 'antd/lib/form/interface';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Container, TableItem } from './styles';
import ProjectsService from '../../../services/projects.service';

const FormProject: React.FC = () => {
  const { TabPane } = Tabs;

  const studentsColumns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Data de Início',
      dataIndex: 'start_date',
    },
    {
      title: 'Modalidade',
      dataIndex: 'modality',
    },
    {
      title: 'Carga horária remunerada',
      dataIndex: 'chr',
    },
    {
      title: 'Carga horária voluntária',
      dataIndex: 'chv',
    },
    {
      title: 'Remuneração (R$)',
      dataIndex: 'pay_amount',
    },
    {
      title: 'Nº Sala de Aula',
      dataIndex: 'class_number',
    },
    {
      title: 'Nº Extraclasse',
      dataIndex: 'extraclass_number',
    },
    {
      title: 'Forma de Atendimento',
      dataIndex: 'type_of_service',
    },
    {
      title: 'Orientador',
      dataIndex: 'teacher_id',
    },
    {
      title: '',
      dataIndex: 'icon',
    },
  ];

  const teachersColumns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: '',
      dataIndex: 'icon',
    },
  ];

  const disciplinesColumns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: '',
      dataIndex: 'icon',
    },
  ];

  interface Student {
    id: number;
    name: string;
    project_id: number;
    student_id: number;
    teacher_id: number;
    term_code: string;
    term_id: number;
    pay_amount: string;
    start_date: Date;
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

  interface Project {
    id: number;
    code: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [project, setProject] = useState<Project>();

  const { id } = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    ProjectsService.show(id).then((response) => {
      setProject(response.data);
    });
  }, []);

  useEffect(() => {
    ProjectsService.getStudents(id).then((response) => {
      setStudents(
        response.data.map((student: any) => ({
          ...student,
          name: student.student.name,
        }))
      );
    });
  }, []);

  useEffect(() => {
    ProjectsService.getTeachers(id).then((response) => {
      setTeachers(response.data);
    });
  }, []);

  useEffect(() => {
    ProjectsService.getDisciplines(id).then((response) => {
      setDisciplines(response.data);
    });
  }, []);

  function handleFinish(value: Store) {}

  return (
    <DashboardLayout>
      <Container>
        <div className="title">
          <h1>{project?.code}</h1>
          <MdEdit size={18} />
        </div>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Estudantes" key="1">
            <TableItem>
              <Table
                locale={{ emptyText: 'Nenhum Estudante Encontrado' }}
                columns={studentsColumns}
                dataSource={students?.map((_) => ({
                  ..._,
                  icon: (
                    <Link to={`/project-students/${_.id}/edit`}>
                      <MdEdit size={18} />
                    </Link>
                  ),
                }))}
                rowKey="id"
                size="middle"
                pagination={false}
              />
            </TableItem>
          </TabPane>
          <TabPane tab="Orientadores" key="2">
            <TableItem>
              <Table
                locale={{ emptyText: 'Nenhum Orientador Encontrado' }}
                columns={teachersColumns}
                dataSource={teachers?.map((_) => ({
                  ..._,
                  icon: (
                    <Link to={`/teachers/${_.id}/edit`}>
                      <MdEdit size={18} />
                    </Link>
                  ),
                }))}
                rowKey="id"
                size="middle"
                pagination={false}
              />
            </TableItem>
          </TabPane>
          <TabPane tab="Disciplinas" key="3">
            <TableItem>
              <Table
                locale={{ emptyText: 'Nenhuma Disciplina Encontrado' }}
                columns={disciplinesColumns}
                dataSource={disciplines?.map((_) => ({
                  ..._,
                  icon: (
                    <Link to={`/projects/${_.id}/edit`}>
                      <MdEdit size={18} />
                    </Link>
                  ),
                }))}
                rowKey="id"
                size="middle"
                pagination={false}
              />
            </TableItem>
          </TabPane>
          <TabPane tab="Outras informações" key="4">
            <Form
              form={form}
              layout="vertical"
              name="nest-messages"
              onFinish={handleFinish}
            >
              <div className="first-line">
                <Form.Item name="project_status" label="Status do projeto">
                  <Select
                    showSearch
                    placeholder="Selecione uma modalidade"
                    optionFilterProp="children"
                    // defaultValue="course_id"
                  >
                    <Option value="Novo">Novo</Option>
                    <Option value="Recondução">Recondução</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="project_cicle" label="Ciclo">
                  <InputNumber min={1} />
                </Form.Item>
              </div>
              <div className="second-line">
                <Form.Item name="chrec" label="C.H.REC.">
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item name="chvah" label="C.H.VAL.">
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                  name="teachers_amount"
                  label="Quantidade de orientadores"
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                  name="students_amount"
                  label="Quantidade de estudantes"
                >
                  <InputNumber min={0} />
                </Form.Item>
              </div>
              <div className="third-line">
                <Form.Item name="total_answer" label="Total Respostas">
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                  name="validated_students_amount"
                  label="Quantidade Estudantes Validados"
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item name="percentage_answer" label="%">
                  <Input disabled addonAfter="%" defaultValue="45" />
                </Form.Item>
                <Form.Item
                  name="students_amount_2"
                  label="Quantidade Estudantes 2"
                >
                  <InputNumber min={0} />
                </Form.Item>
              </div>
              <div className="fourth-line">
                <Form.Item
                  name="requested_ch_class"
                  label="C.H. Solicitada Sala de Aula"
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                  name="requested_ch_extraclass"
                  label="C.H. Solicitada Extraclasse"
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                  name="total_requested_hours"
                  label="Total de Horas Solicitadas"
                >
                  <Input disabled defaultValue="24" />
                </Form.Item>
              </div>
              <div className="fifth-line">
                <Form.Item
                  name="approved_ch_class"
                  label="C.H. Aprovada Sala de Aula"
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                  name="approved_ch_extraclass"
                  label="C.H. Aprovada Extraclasse"
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                  name="total_scolarship"
                  label="Horas Aprovadas com Bolsa"
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                  name="total_voluntary"
                  label="Horas Aprovadas Voluntário"
                >
                  <InputNumber min={0} />
                </Form.Item>
              </div>
              <div className="sixth-line">
                <Form.Item name="project_score" label="Nota do Projeto">
                  <Input />
                </Form.Item>
                <Form.Item name="final_result" label="Resultado Final">
                  <Select
                    showSearch
                    placeholder="Selecione um resultado"
                    optionFilterProp="children"
                    // defaultValue="course_id"
                  >
                    <Option value="Bolsa">Bolsa</Option>
                    <Option value="Voluntário">Voluntário</Option>
                    <Option value="Bolsa+Voluntário">Bolsa+Voluntário</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="buttons-field">
                <Link to="/teachers">
                  <Button
                    type="primary"
                    danger
                    htmlType="submit"
                    onClick={(value) => console.log('ahoy!')}
                  >
                    Cancelar
                  </Button>
                </Link>
                <Button type="primary" htmlType="submit">
                  Salvar
                </Button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </Container>
    </DashboardLayout>
  );
};

export default FormProject;
