import React, { ReactNode, useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdAdd, MdDeleteForever } from 'react-icons/md';
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Table,
} from 'antd';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import logoMonitoria from '../../assets/Logo-Monitoria.svg';
import { Header, Container, FormContainer } from './styles';

import SchoolService from '../../services/schools.service';
import CampusService from '../../services/campus.service';
import CoursesService from '../../services/courses.service';


const NewProjectSubmissionForm: React.FC = () => {
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

  interface Teacher {
    id: number;
    name: string;
  }

  type TableLine = {
    key: number;
    challenges: Array<ReactNode>;
    activities: Array<ReactNode>;
    strategies: Array<ReactNode>;
  };
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  

  const [campuses, setCampuses] = useState<Campus[]>();
  const [schools, setSchools] = useState<School[]>();
  const [courses, setCourses] = useState<Course[]>();
  const [allCourses, setAllCourses] = useState<Course[]>();
  const [showTeacherForm, setShowTeacherForm] = useState<boolean>(false);
  const [showDisciplineForm, setShowDisciplineForm] = useState<boolean>(false);
  const [stateChallenge, setChallangeState] = useState<boolean>(false);
  const [stateStrategy, setStrategyState] = useState<boolean>(false);
  const [stateActivity, setActivityState] = useState<boolean>(false);
  const [chClass, setChClass] = useState<number>(0);
  const [chExtraClass, setChExtraClass] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [checkboxValue, setCheboxValue] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [line, setLine] = useState<TableLine>();
  // challenge states
  const [challenge, setChallenge] = useState<string>('');
  const [challageArray, setChallageArray] = useState<string[]>([]);
  // Activities states
  const [activities, setActivities] = useState<string>('');
  const [activitiesArray, setActivitiesArray] = useState<string[]>([]);
  // strategies states
  const [strategies, setStrategies] = useState<string>('');
  const [strategiesArray, setStrategiesArray] = useState<string[]>([]);

  const [valuesTable, setTableValue] = useState<TableLine[]>([]);
  const validateMessages = {
    required: 'Campo Obrigatório',
    types: {
      email: '${label} inválido!',
      number: '${label} não é um número válido!',
    },
  };

  const columnsStrategies = [
    {
      title: 'Desafios de Aprendizagem a serem enfrentados',
      dataIndex: 'challenges',
      key: 'challenges'
    },
    {
      title: 'Correspondentes atividades da monitoria',
      dataIndex: 'activities',
      key: 'activities'
    },
    {
      title: 'Estratégia para alcançar os estudantes',
      dataIndex: 'strategies',
      key: 'strategies'
    }
  ];
  useEffect(() => {
    CampusService.get().then((response) => {
      setCampuses(response.data);
    });
    CoursesService.get().then((response) => {
      setAllCourses(response.data);
    });
    // TeachersService.getAll().then((response) => {
    //   setTeachers(response.data);
    // });
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

  function insertLine(input: string, id: string) {
    switch (id) {
      case 'challenge':
        setChallenge(input);
        return ((input === '') ? setChallangeState(false) : setChallangeState(true));
      case 'activity':
        setActivities(input);
        return ((input === '') ? setActivityState(false) : setActivityState(true));
      case 'strategy':
        setStrategies(input);
        return ((input === '') ? setStrategyState(false) : setStrategyState(true));
      default:
        return (null);
    }
  }

  function addToScreen(id: number){
    switch (id){
      case 1:
        return (setChallageArray([...challageArray, challenge]));
      case 2:
        return (setActivitiesArray([...activitiesArray, activities]));
      case 3:
        return (setStrategiesArray([...strategiesArray, strategies]));
      default:
        return (null);
    }
    
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
          <h2>ANEXO 1 - PROJETO NOVO</h2>
          <p>Utilize este Anexo para propor um Projeto de Monitoria inédito.</p>
          <p>
            <span>1.VINCULAÇÃO DO PROJETO DE MONITORIA:</span>
          </p>
          <Form
            form={form}
            layout="vertical"
            name="nest-messages"
            onFinish={() => console.log('Done')}
            validateMessages={validateMessages}
          >
            <div className="fisrt-line">
              <Form.Item
                name="campus_id"
                label="Campus"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  placeholder="Selecione um Campus"
                  optionFilterProp="children"
                  onChange={(value) => loadCampusesSchools(value as number)}
                  // defaultValue="school_id"
                >
                  {campuses?.map((campus) => (
                    <Option key={campus.id} value={campus.id}>
                      {campus.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="schools_id"
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
                  {schools?.map((school) => (
                    <Option key={school.id} value={school.id}>
                      {school.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="courses_id"
                label="Curso de vínculo"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  placeholder="Selecione um Curso"
                  optionFilterProp="children"
                  // onChange={(value) => loadCampusesSchools(value as number)}
                  // defaultValue="school_id"
                >
                  {courses?.map((course) => (
                    <Option key={course.id} value={course.id}>
                      {course.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

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
                    name="teacher_email"
                    label="E-mail institucional"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Ex: joao.pereira"
                      addonAfter="@pucpr.br"
                    />
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

            <Form.Item name="disciplines_id" label="Disciplinas do Projeto">
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

            <p style={{ fontWeight: 'bolder' }}>
              1.1 Modalidade de atendimento do(s) monitor(es):
            </p>
            <p>
              Apresente como os monitores atuarão neste projeto, completando o
              quadro abaixo (apague os textos em azul, que são apenas exemplos
              de preenchimento do quadro).
            </p>
            <p>
              Calcule o número de horas de atendimento em sala de aula (nº de
              horas aula semanais que precisarão de monitores em sala) e o
              número de horas de monitoria extraclasse, tendo como base para
              este último caso, a referência: 8 horas de monitoria extraclasse
              para cada 240 estudantes matriculados nas disciplinas atendidas
              pelo projeto.
            </p>
            <p>
              Lembre-se: na modalidade exclusivamente em sala de aula, não cabe
              atribuição de horas não letivas; na modalidade extraclasse, o
              orientador deverá obrigatoriamente ter em seu TACH 1 hora não
              letiva para cada 8 horas semanais de monitoria extraclasse, a ser
              confirmada pelo Decano/Diretor após aprovação do projeto.
            </p>

            <Form.Item
              name="students_estimate"
              label="Estimativa de estudantes matriculados na(s) disciplina(s) no ciclo 2020/1"
            >
              <Form.Item
                name="students_amount"
                label="Quantidade"
                rules={[{ required: true }]}
              >
                <InputNumber
                  placeholder="Ex: 240"
                  min={0}
                  max={1000}
                  style={{ width: '10%' }}
                />
              </Form.Item>
              <Form.Item
                name="students_justification"
                label="Justificativa"
                rules={[{ required: true }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Serão 4 turmas de 60 estudantes cada"
                />
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="ch_class"
              label="Carga horária de monitoria semanal - EM SALA"
            >
              <Form.Item
                name="chc_amount"
                label="Quantidade em horas"
                rules={[{ required: true }]}
              >
                <InputNumber
                  placeholder="Ex: 24"
                  min={0}
                  max={168}
                  style={{ width: '10%' }}
                />
              </Form.Item>
              <Form.Item
                name="chc_justification"
                label="Justificativa"
                rules={[{ required: true }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Haverá monitor em todas as aulas. Cada turma tem 6h semanais de aula (4x6=24)"
                />
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="ch_extraclass"
              label="Carga horária de monitoria semanal - EXTRACLASSE"
            >
              <Form.Item
                name="che_amount"
                label="Quantidade em horas"
                rules={[{ required: true }]}
              >
                <InputNumber
                  placeholder="Ex: 8"
                  min={0}
                  max={1000}
                  style={{ width: '10%' }}
                />
              </Form.Item>
              <Form.Item
                name="che_justification"
                label="Justificativa"
                rules={[{ required: true }]}
              >
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
                <InputNumber placeholder="Ex: 32" style={{ width: '10%' }} />
              </Form.Item>
            </Form.Item>

            <p>
              <span>
                2.DESCRIÇÃO DA(S) DISCIPLINA(S) ATENDIDA(S) PELO PROJETO:
              </span>
            </p>

            <p style={{ fontWeight: 'bolder' }}>2.1 Características</p>
            <Form.Item
              name="characteristics_justification"
              label="Justifique a necessidade da monitoria para a disciplina. (por exemplo: Quais os históricos de evasão e de índices de reprovação? Atende a estudantes calouros ou formandos? A disciplina constitui pré-requisito para outra disciplina e costuma reter estudantes?"
              rules={[{ required: true }]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <p style={{ fontWeight: 'bolder' }}>2.2 Desafios de aprendizagem</p>
            <Form.Item
              name="challenges_justification"
              label="Indique os principais desafios ou dificuldades que o professor orientador prevê encontrar durante a execução do projeto tendo em vista as características da(s) disciplina(s), o perfil e as dificuldades dos estudantes que serão atendidos pela monitoria. Analise quais são as dificuldades de aprendizagem que os estudantes dessa(s) disciplina(s) enfrentam e que você tentará resolver com este projeto de monitoria."
              rules={[{ required: true }]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <p>
              <span>3.ESTRATÉGIAS E ATIVIDADES:</span>
            </p>
            
            <p>
              Quadro{' '}
              <span
                style={{ textDecoration: 'underline', fontWeight: 'normal' }}
              >
                descritivo
              </span>{' '}
              dos problemas de aprendizagem e desafios que a monitoria buscará
              enfrentar e as estratégias e propostas para enfrentá-los. O
              objetivo deste quadro é que as principais dificuldades de
              aprendizagem sejam identificadas e que haja um plano de ação da
              monitoria para atacá-las de maneira proativa. É importante
              explicitar quais as estratégias que se pretende usar para alcançar
              os estudantes com as ações de monitoria.
            </p>
            {/*
            <Row justify="space-between" align="middle">
              <Col span={7}>
                <Form.Item
                  name="learning_challenges"
                  label="Desafios de aprendizagem a serem enfrentados"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    rows={10}
                    placeholder="Exemplo: Dificuldades com Interpretação de problemas"
                    style={{ textAlign: 'justify' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="activities"
                  label="Correspondentes atividades da monitoria"
                  rules={[{ required: true }]}
                >
                  <Row>
                    <TextArea
                      rows={10}
                      placeholder="Exemplo: Sala de aula O monitor acompanhará as atividades dos estudantes em sala que requerem interpretação de problemas, elaboran-do questões para guiar o pensamento dos estudantes que estiverem com dificuldades nestas atividades (não pode dar as respostas, mas deve incentivar a reflexão)"
                      style={{ textAlign: 'justify' }}
                    />
                  </Row>
                  <Row>
                    <TextArea
                      rows={10}
                      placeholder="Exemplo: Extraclasse O monitor gravará um vídeo com um exemplo de interpre-tação de problema e aplicará atividades extraclasse sobre o tema"
                      style={{ textAlign: 'justify' }}
                    />
                  </Row>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="strategies"
                  label="Estratégia para alcançar os estudantes"
                  rules={[{ required: true }]}
                >
                  <Row>
                    <TextArea
                      rows={10}
                      placeholder="Exemplo: Todos os estudantes serão alcançados pela presença do monitor em sala de aula"
                      style={{ textAlign: 'justify' }}
                    />
                  </Row>
                  <Row>
                    <TextArea
                      rows={10}
                      placeholder="Exemplo: Estudantes que apresentarem as atividades da monitoria realizadas terão direito a uma nova atividade avaliativa caso necessitem recuperar a aprendizagem durante o se-mestre, o que deve incentivar a procura pelo monitor"
                      style={{ textAlign: 'justify' }}
                    />
                  </Row>
                </Form.Item>
              </Col>
            </Row>
              */}
            <small>Tabela definitiva</small>
            <Table
              dataSource={valuesTable}
              columns={columnsStrategies} 
              pagination={false} 
            />
            <Row>
              <Col span={8}>
                <span>
                  Desafios de aprendizagem a serem enfrentados
                </span>
                <TextArea 
                  placeholder=""
                  id='challenge'
                  onChange={event =>
                    insertLine(event.target.value, event.target.id)}
                  value={challenge}
                  autoSize 
                  allowClear 
                />
                <Button
                  style={{ width: '100%', marginTop: 3 }}
                  disabled={!stateChallenge}
                  onClick={() => {
                    addToScreen(1);
                    setChallenge('');
                  }}
                >
                  Adicionar desafio
                </Button>
                <ul>
                  {challageArray.map((challageElemnt) =>
                    <li key={challageElemnt}>{challageElemnt}</li>
                  )}
                </ul>
              </Col>
              <Col span={8}>
                <span>
                  Correspondentes atividades da monitoria
                </span>
                <TextArea
                  placeholder=""
                  id="activity"
                  onChange={event =>
                    insertLine(event.target.value, event.target.id)}
                  value={activities}
                  autoSize
                  allowClear
                />
                <Button 
                  style={{ width: '100%', marginTop: 3 }}
                  onClick={() => {
                    addToScreen(2);
                    setActivities('');
                  }}
                  disabled={!stateActivity}
                >
                  Adicionar atividade
                </Button>
                <ul>
                  {activitiesArray.map((activitiesElement) =>
                    <li key={activitiesElement}>{activitiesElement}</li>
                  )}
                </ul>
              </Col>
              <Col span={8}>
                <span>
                  Estratégia para alcançar os estudantes
                </span>
                <TextArea
                  placeholder=""
                  id="strategy"
                  onChange={event =>
                    insertLine(event.target.value, event.target.id)}
                  value={strategies}
                  autoSize
                  allowClear
                />
                <Button 
                  style={{ width: '100%', marginTop: 3 }}
                  onClick={() => {
                    addToScreen(3);
                    setStrategies('');
                  }}
                  disabled={!stateStrategy}
                >
                  Adicionar estratégia
                </Button>
                <ul>
                  {strategiesArray.map((strategiesElement) =>
                    <li key={strategiesElement}>{strategiesElement}</li>
                  )}
                </ul>
              </Col>
            </Row>
            <Button
              style={{
                width: '100%',
                marginTop: 3,
                marginBottom: 3
              }}
              onClick={() => {
                setTableValue([...valuesTable, {
                  key: valuesTable.length,
                  challenges: challageArray.map((e) => 
                    <li key={e}> - {e}</li>),
                  activities: activitiesArray.map((e) => 
                    <li key={e}> - {e}</li>),
                  strategies: challageArray.map((e) => 
                    <li key={e}> - {e}</li>)
                }]);
                setActivitiesArray([]);
                setChallageArray([]);
                setStrategiesArray([]);
              }}
            >
              Finalizar linha
            </Button>
            {/* <div className="table">
              
              <TextArea rows={3} />
              <TextArea rows={3} />
            </div> */}

            <Checkbox
              onChange={(e: CheckboxChangeEvent) =>
                setCheboxValue(e.target.checked)}
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

export default NewProjectSubmissionForm;
