import React, { useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdAdd, MdDeleteForever } from 'react-icons/md';
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  InputNumber,
  Checkbox,
} from 'antd';

import logoMonitoria from '../../assets/Logo-Monitoria.svg';
import { Header, Container, FormContainer } from './styles';

import SchoolService from '../../services/schools.service';
import CampusService from '../../services/campus.service';
import CoursesService from '../../services/courses.service';
import ProjectsService from '../../services/projects.service';
import { RadioChangeEvent } from 'antd/lib/radio';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const FinalReportLessFormClass: React.FC = () => {
  interface Campus {
    id: number;
    name: string;
  }

  interface School {
    id: number;
    name: string;
    campus_id: number;
  }

  interface Course {
    id: number;
    name: string;
    school_id?: number;
  }

  interface Project {
    id: number;
    code: string;
  }

  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  const [projects, setProjects] = useState<Project[]>();
  const [campuses, setCampuses] = useState<Campus[]>();
  const [schools, setSchools] = useState<School[]>();
  const [courses, setCourses] = useState<Course[]>();
  const [reconductionValue, setReconductionValue] = React.useState(1);
  const [periodValue, setPeriodValue] = React.useState(1);
  const [allCourses, setAllCourses] = useState<Course[]>();
  const [showTeacherForm, setShowTeacherForm] = useState<boolean>(false);
  const [showDisciplineForm, setShowDisciplineForm] = useState<boolean>(false);
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  const validateMessages = {
    required: 'Campo Obrigatório',
    types: {
      email: '${label} inválido!',
      number: '${label} não é um número válido!',
    },
  };

  useEffect(() => {
    ProjectsService.getAll().then((response) => {
      setProjects(response.data);
    });
  }, []);

  useEffect(() => {
    CampusService.get().then((response) => {
      setCampuses(response.data);
    });
  }, []);

  useEffect(() => {
    CoursesService.get().then((response) => {
      setAllCourses(response.data);
    });
  }, []);

  function loadCampusesSchools(campusId: number) {
    CampusService.getSchools(campusId).then((response) => {
      setSchools(response.data);
    });
  }

  function loadSchoolCourses(schoolId: number) {
    SchoolService.getCourses(schoolId).then((response) => {
      setCourses(response.data);
      if (response.data.length)
        form.setFieldsValue({ course_id: response.data[0].id });
    });
  }

  return (
    <div>
      <Header>
        <div>
          <img src={logoMonitoria} alt="Logo" />
        </div>
        <div>
          <span>Marina de Lara</span>
          <FaEllipsisH size={17} />
        </div>
      </Header>
      <Container>
        <FormContainer>
          <h2>
            ANEXO 5 – RELATÓRIO FINAL PARA PROJETOS EXCLUSIVAMENTE COM MONITORES
            QUE ATUAM DURANTE AS AULAS (NOTA ANTERIOR INFERIOR A 8,0)
          </h2>
          <p>
            Utilize este Anexo se, ao ser avaliado em ciclo anterior, o
            relatório final obteve nota inferior a 8,0. Este relatório é escrito
            pelo monitor e apresentado pelo professor proponente do projeto.
          </p>
          <Form
            form={form}
            layout="vertical"
            name="nest-messages"
            onFinish={() => console.log('Done')}
            validateMessages={validateMessages}
          >
            <h3>PREENCHIDO PELO MONITOR</h3>
            <Form.Item
              name="project_id"
              label="Nº do Projeto"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Selecione um Projeto"
                optionFilterProp="children"
              >
                {projects?.map((project) => (
                  <Option key={project.id} value={project.id}>
                    {project.code}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="activities_details"
              label="1. DETALHAMENTO DAS ATIVIDADES REALIZADAS:"
              rules={[{ required: true }]}
            >
              <TextArea
                rows={4}
                placeholder="Explicação do item: descreva aqui as atividades realizadas pelo(s) monitor(es) durante este ciclo de monitorias.
              Justifique a coerência das atividades com o projeto enviado. 
              "
              />
            </Form.Item>

            <Form.Item
              name="program_reach"
              label="2. ALCANCE DA MONITORIA:"
              rules={[{ required: true }]}
            >
              <TextArea
                rows={4}
                placeholder="Explicação do item: apresente dados concretos sobre o número de estudantes que a monitoria conseguiu atender neste ciclo, com base em dados dos Relatórios de atividades desenvolvidas dos monitores."
              />
            </Form.Item>

            <Form.Item
              name="learning_improvements"
              label="3. MELHORIAS DE APRENDIZAGEM:"
              rules={[{ required: true }]}
            >
              <TextArea
                rows={8}
                placeholder="Explicação do item: A monitoria deve produzir resultados de aprendizagem, conforme o contexto em que está inserida, e esses resultados precisam ser avaliados, qualitativa ou quantitativamente. Nem sempre os resultados de aprendizagem se refletem em maiores notas ou maiores índices de aprovação. Por isso, você também deve buscar no seu projeto sinais qualitativos de efetividade, como melhoria da motivação dos estudantes e dos monitores, melhores desempenhos dos estudantes nas atividades letivas, maior dedicação dos estudantes na disciplina, etc. Analise os resultados das atividades de monitoria sobre a aprendizagem dos estudantes, com utilização de dados concretos (estatísticas de redução dos índices de reprovação/evasão/absenteísmo ou de melhoria das notas dentro do semestre, enquetes etc.). Organize os dados em gráficos e tabelas. Indique os sinais de sucesso do seu projeto de monitoria, apontando de forma clara e específica qual o ganho alcançado na aprendizagem dos estudantes e dos monitores."
              />
            </Form.Item>

            <Form.Item
              name="self-reflection"
              label="4. AUTORREFLEXÃO DO MONITOR:"
              rules={[{ required: true }]}
            >
              <TextArea
                rows={4}
                placeholder="Explicação do item: apresente aqui a sua análise dos resultados da monitoria deste ciclo e as propostas concretas de melhoria para o próximo ciclo."
              />
            </Form.Item>

            <h3>PREENCHIDO PELO PROFESSOR</h3>

            <Form.Item
              name="reconduction_option"
              label="2.DESEJA RECONDUZIR ESTE PROJETO PARA O PRÓXIMO CICLO?"
              rules={[{ required: true }]}
            >
              <Radio.Group
                onChange={(e: RadioChangeEvent) =>
                  setReconductionValue(e.target.value)
                }
                value={reconductionValue}
              >
                <Radio value={1}>Sim</Radio>
                <Radio value={2}>Não</Radio>
              </Radio.Group>
            </Form.Item>

            <p>Em caso de resposta positiva, prossiga com o preenchimento</p>

            <Form.Item name="period_option" rules={[{ required: true }]}>
              <Radio.Group
                onChange={(e: RadioChangeEvent) =>
                  setPeriodValue(e.target.value)
                }
                value={periodValue}
              >
                <Radio value={1}>2º Sem. 2021</Radio>
                <Radio value={2}>1º Sem. 2022</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="project_bond"
              label="2.1 Vinculação do projeto de monitoria:"
              rules={[{ required: true }]}
            >
              <div className="fisrt-line">
                <Select
                  showSearch
                  placeholder="Selecione um Campus"
                  optionFilterProp="children"
                  onChange={(value) => loadCampusesSchools(value as number)}
                >
                  {campuses?.map((campus) => (
                    <Option key={campus.id} value={campus.id}>
                      {campus.name}
                    </Option>
                  ))}
                </Select>

                <Select
                  showSearch
                  placeholder="Selecione uma Escola"
                  optionFilterProp="children"
                  onChange={(value) => loadSchoolCourses(value as number)}
                >
                  {schools?.map((school) => (
                    <Option key={school.id} value={school.id}>
                      {school.name}
                    </Option>
                  ))}
                </Select>

                <Select
                  showSearch
                  placeholder="Selecione o Curso"
                  optionFilterProp="children"
                >
                  {courses?.map((course) => (
                    <Option key={course.id} value={course.id}>
                      {course.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </Form.Item>

            <Form.Item name="teachers_id" label="Professor(es) proponente(s)">
              <Button type="primary" onClick={() => setShowTeacherForm(true)}>
                {/* <MdAdd size="18" /> */}
                Adicionar Professor
              </Button>
              {showTeacherForm ? (
                <div className="input-teachers-group">
                  <Form.Item
                    name="teacher_name"
                    label="Nome completo"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Ex: João da Silva Pereira" />
                  </Form.Item>
                  <Form.Item
                    name="teacher_phone_id"
                    label="Telefone"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Ex: (41) 99999-9999" />
                  </Form.Item>
                  <MdDeleteForever
                    size="24"
                    onClick={() => setShowTeacherForm(false)}
                  />
                </div>
              ) : (
                <></>
              )}
            </Form.Item>

            <Form.Item
              name="disciplines_id"
              label="2.2 Informe as disciplinas atendidas pelo projeto em 2020/2, caso haja mudanças com relação ao ciclo anterior."
            >
              <Button
                type="primary"
                onClick={() => setShowDisciplineForm(true)}
              >
                {/* <MdAdd size="18" /> */}
                Adicionar Disciplina
              </Button>
              {showDisciplineForm ? (
                <div className="input-disciplines-group">
                  <div className="first-line-group">
                    <Form.Item
                      name="disciplines_name"
                      label="Nome da disciplina"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Ex: Farmacologia Clínica" />
                    </Form.Item>
                    <Form.Item
                      name="disciplines_code"
                      label="Código da disciplina"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Ex: SB07030-04" />
                    </Form.Item>
                    <MdDeleteForever
                      size="24"
                      onClick={() => setShowDisciplineForm(false)}
                    />
                  </div>
                  <div className="second-line-group">
                    <Form.Item
                      name="disciplines_ch"
                      label="Carga horária semanal"
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        step="2"
                        placeholder="Ex: 20"
                        min={2}
                        max={80}
                      />
                    </Form.Item>
                    <Form.Item
                      name="disciplines_course"
                      label="Curso de vínculo da disciplina"
                      rules={[{ required: true }]}
                    >
                      <Select
                        showSearch
                        placeholder="Ex: Farmácia"
                        optionFilterProp="children"
                      >
                        {allCourses?.map((course) => (
                          <Option key={course.id} value={course.id}>
                            {course.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              ) : (
                <> </>
              )}
            </Form.Item>

            <p>2.3 Modalidade de atendimento do(s) monitor(es):</p>
            <p>
              Apresente como os monitores atuarão neste projeto, completando o
              quadro abaixo.
            </p>
            <p>
              Lembre-se: na modalidade exclusivamente em sala de aula, não cabe
              atribuição de horas não letivas; na modalidade extraclasse, o
              orientador deverá obrigatoriamente ter em seu TACH 1 hora não
              letiva para cada 8 horas semanais de monitoria extraclasse, a ser
              confirmada pelo Decano/Diretor após aprovação do projeto.
            </p>
            <p>
              Calcule o número de horas de atendimento em sala de aula (nº de
              horas aula semanais que precisarão de monitores em sala) e o
              número de horas de monitoria extraclasse, tendo como base para
              este último caso, a referência: 8 horas de monitoria extraclasse
              para cada 240 estudantes matriculados nas disciplinas atendidas
              pelo projeto.
            </p>

            <Form.Item
              name="students_estimate"
              label="Estimativa de estudantes matriculados na(s) disciplina(s) no ciclo 2020/1"
              rules={[{ required: true }]}
            >
              <Form.Item name="students_amount" label="Quantidade">
                <InputNumber
                  placeholder="Ex: 240"
                  min={0}
                  max={1000}
                  style={{ width: '10%' }}
                />
              </Form.Item>
              <Form.Item name="students_justification" label="Justificativa">
                <TextArea
                  rows={2}
                  placeholder="Serão 4 turmas de 60 estudantes cada"
                />
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="ch_class"
              label="Carga horária de monitoria semanal - EM SALA"
              rules={[{ required: true }]}
            >
              <Form.Item name="chc_amount" label="Quantidade em horas">
                <InputNumber
                  placeholder="Ex: 24"
                  min={0}
                  max={168}
                  style={{ width: '10%' }}
                />{' '}
                h
              </Form.Item>
              <Form.Item name="chc_justification" label="Justificativa">
                <TextArea
                  rows={4}
                  placeholder="Haverá monitor em todas as aulas. Cada turma tem 6h semanais de aula (4x6=24)"
                />
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="ch_extraclass"
              label="Carga horária de monitoria semanal - EXTRACLASSE"
              rules={[{ required: true }]}
            >
              <Form.Item name="che_amount" label="Quantidade em horas">
                <InputNumber
                  placeholder="Ex: 8"
                  min={0}
                  max={1000}
                  style={{ width: '10%' }}
                />{' '}
                h
              </Form.Item>
              <Form.Item name="che_justification" label="Justificativa">
                <TextArea
                  rows={4}
                  placeholder="Nº de horas de monitor extraclasse para atender 240 estudantes, conforme regras da monitoria"
                />
              </Form.Item>
              <Form.Item
                name="total"
                label="Total de horas"
                rules={[{ required: true }]}
              >
                <InputNumber
                  placeholder="Ex: 32"
                  style={{ width: '10%' }}
                  min={0}
                  max={1000}
                />{' '}
                h
              </Form.Item>
            </Form.Item>

            <Checkbox
              checked={checkboxValue}
              onChange={(e: CheckboxChangeEvent) =>
                setCheckboxValue(e.target.checked)
              }
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              quam nec eros cursus euismod. Donec molestie justo ac est commodo,
              eu ultricies lorem mattis. Nulla quis neque rhoncus augue
              scelerisque pharetra. Curabitur porttitor imperdiet erat sed
              finibus. Curabitur id nisi a turpis bibendum molestie ac at dolor.
            </Checkbox>

            <Button
              className="primary-button"
              type="primary"
              htmlType="submit"
              disabled={!checkboxValue}
            >
              CONCORDAR E SUBMETER
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </div>
  );
};

export default FinalReportLessFormClass;
