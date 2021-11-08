import React, { useEffect, useState } from 'react';
import { FaEllipsisH, FaPray, FaRockrms } from 'react-icons/fa';
import { MdClear, MdDeleteForever, MdDone, MdEdit } from 'react-icons/md';
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
  Typography,
  Tooltip,
} from 'antd';

import { Store } from 'antd/lib/form/interface';

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
    challanges: Array<ValueOfTable>;
    activities: Array<ValueOfTable>;
    strategies: Array<ValueOfTable>;
  };

  type ValueOfTable = {
    value: string;
    editing?: boolean;
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
  const [chClass, setChClass] = useState<number>(0);
  const [chExtraClass, setChExtraClass] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [checkboxValue, setCheboxValue] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [keyState, addKeyState] = useState<number>(0);
  // challange states
  const [stateChallange, setChallangeState] = useState<boolean>(false);
  const [challange, setChallange] = useState<string>('');
  const [challageArray, setChallageArray] = useState<ValueOfTable[]>([]);
  // Activities states
  const [stateActivity, setActivityState] = useState<boolean>(false);
  const [activities, setActivities] = useState<string>('');
  const [activitiesArray, setActivitiesArray] = useState<ValueOfTable[]>([]);
  // strategies states
  const [stateStrategy, setStrategyState] = useState<boolean>(false);
  const [strategies, setStrategies] = useState<string>('');
  const [strategiesArray, setStrategiesArray] = useState<ValueOfTable[]>([]);

  const [valuesStringTable, setStringValeus] = useState<TableLine[]>([]);

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
      dataIndex: 'challanges',
      key: 'challanges',
      render: (array: ValueOfTable[]) => (
        <ul>
          {array.map((e) => <li key={array.indexOf(e)}>{e.value}</li>)}
        </ul>
      ),
    },
    {
      title: 'Correspondentes atividades da monitoria',
      dataIndex: 'activities',
      key: 'activities',
      render: (array: ValueOfTable[]) => (
        <ul>
          {array.map((e) => <li key={array.indexOf(e)}>{e.value}</li>)}
        </ul>
      )
    },
    {
      title: 'Estratégia para alcançar os estudantes',
      dataIndex: 'strategies',
      key: 'strategies',
      render: (array: ValueOfTable[]) => (
        <ul>
          {array.map((e) => <li key={array.indexOf(e)}>{e.value}</li>)}
        </ul>
      )
    },
    {
      title: '',
      dataIndex: 'key',
      key: 'key',
      render: (id: number) =>(
        <MdDeleteForever
          size='24'
          className="remove"
          onClick={() => removeLineFromTable(id)}
        />
      ),
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

  function handleEdit(element: ValueOfTable, id: string){
    switch (id){
      case 'challange':{
        console.log('achei');
        setChallageArray(challageArray.map((e) => {
          if (e !== element) return e;
          return { ...e, editing: true };
        }));
        break;
      }
      case 'activities':{
        setActivitiesArray(activitiesArray.map((e) => {
          if (e !== element) return e;
          return { ...e, editing: true };
        }));
        break;
      }
      case 'strategies':{
        setStrategiesArray(strategiesArray.map((e) => {
          if (e !== element) return e;
          return { ...e, editing: true };
        }));
        break;
      }
    }
  }

  function handleFinish(
    { name }: Store, 
    element: ValueOfTable, 
    id: string){
    switch (id){
      case 'challange':{
        setChallageArray(challageArray.map((e) => {
          if (e !== element){
            return e;
          }
          return ({ ...e, editing: false, value: name });
        }));
        break;
      }
      case 'activities':{
        setActivitiesArray(activitiesArray.map((e) => {
          if (e !== element){
            return e;
          }
          return ({ ...e, editing: false, value: name });
        }));
        break;
      }
      case 'strategies':{
        setStrategiesArray(strategiesArray.map((e) => {
          if (e !== element){
            return e;
          }
          return ({ ...e, editing: false, value: name });
        }));
        break;
      }
    }
  }

  function handleRemoveArray(index: number, id: string){
    switch (id){
      case 'challange':{
        const newArray = challageArray.filter(e => 
          index !== challageArray.indexOf(e));
        return (newArray);
      }
      case 'activities':{
        const newArray = activitiesArray.filter(e =>
          index !== activitiesArray.indexOf(e));
        return (newArray);
      }
      case 'strategies':{
        const newArray = strategiesArray.filter(e =>
          index !== strategiesArray.indexOf(e));
        return (newArray);
      }
      default:{
        return ([]);
      }
    }
    
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
      case 'challange':
        setChallange(input);
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

  function removeLineFromTable(id: number) {
    const newStringValues = valuesStringTable.filter(valor => id !== valor.key);
    setStringValeus([...newStringValues]);
  }

  function addToScreen(id: number){
    switch (id){
      case 1:
        return (setChallageArray([...challageArray, {
          value: challange, 
          editing: false 
        }]));
      case 2:
        return (setActivitiesArray([...activitiesArray, {
          value: activities,
          editing: false
        }]));
      case 3:
        return (setStrategiesArray([...strategiesArray, {
          value: strategies,
          editing: false
        }]));
      default:
        return (null);
    }
    
  }

  function addValuesToTable() {
    setStringValeus([...valuesStringTable, {
      key: keyState,
      challanges: challageArray,
      activities: activitiesArray,
      strategies: strategiesArray }
    ]);
    setActivitiesArray([]);
    setChallageArray([]);
    setStrategiesArray([]);
    addKeyState(keyState+1);
  }

  const onFinish = (values: object) => {
    console.log(values);
  };

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
            onFinish={onFinish}
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
            <Form.List name="teachers_id">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item label="Professor(es) proponente(s)">
                    <Button 
                      type="primary"
                      onClick={() => add()}
                    >
                      Adicionar Professor
                    </Button>
                  </Form.Item>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key} className="input-teachers-group">
                      <Form.Item
                        {...restField}
                        name={[name, 'teacher_name']}
                        fieldKey={[fieldKey, 'teacher_name']}
                        label="Nome completo"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Ex: João da Silva Pereira" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'teacher_email']}
                        fieldKey={[fieldKey, 'teacher_email']}
                        label="E-mail institucional"
                        rules={[{ required: true }]}
                      >
                        <Input
                          placeholder="Ex: joao.pereira"
                          addonAfter="@pucpr.br"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'teacher_phone_id']}
                        fieldKey={[fieldKey, 'teacher_phone_id']}
                        label="Telefone"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Ex: (41) 99999-9999" />
                      </Form.Item>
                      <MdDeleteForever
                        size="24" 
                        onClick={() => remove(name)}
                      />
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <Form.List name="disciplines_id">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item label="Disciplinas do Projeto">
                    <Button
                      type="primary"
                      onClick={() => add()}
                    >
                      Adicionar Disciplina
                    </Button>
                  </Form.Item>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key} className="input-disciplines-group">
                      <div className="first-line-group">
                        <Form.Item
                          {...restField}
                          name={[name, 'disciplines_name']}
                          fieldKey={[fieldKey, 'disciplines_name']}
                          label="Nome da disciplina"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Ex: Farmacologia Clínica" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'disciplines_code']}
                          fieldKey={[fieldKey, 'disciplines_code']}
                          label="Código da disciplina"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Ex: SB07030-04" />
                        </Form.Item>
                        <MdDeleteForever
                          size="24"
                          onClick={() => remove(name)}
                        />
                      </div>
                      <div className="second-line-group">
                        <Form.Item
                          {...restField}
                          name={[name, 'disciplines_ch']}
                          fieldKey={[fieldKey, 'disciplines_ch']}
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
                          {...restField}
                          name={[name, 'disciplines_course']}
                          fieldKey={[fieldKey, 'disciplines_course']}
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
                  ))}
                </>
              )}
            </Form.List>
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
              name="challanges_justification"
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
                  name="learning_challanges"
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
              locale={{ emptyText: 'Nenhum dado inserido' }}
              dataSource={valuesStringTable}
              columns={columnsStrategies} 
              pagination={false} 
            />
            <Row className='inputs-activities'>
              <Col span={8}>
                <div style={{ margin: 7 }}>
                  <span>
                    Desafios de aprendizagem a serem enfrentados
                  </span>
                  <TextArea 
                    style={{ width: '83%' }}
                    placeholder=""
                    id='challange'
                    onChange={event =>
                      insertLine(event.target.value, event.target.id)}
                    value={challange}
                    autoSize 
                    allowClear 
                  />
                  <Button
                    disabled={!stateChallange || challageArray.length >= 1}
                    onClick={() => {
                      addToScreen(1);
                      setChallange('');
                      insertLine('', 'challange');
                    }}
                  >
                    +
                  </Button>
                  <ul style={{ marginTop: 5 }}>
                    {challageArray.map((challageElement, index) =>
                      <li key={challageElement.value}>
                        {(challageElement.editing) ? (
                          <Form
                            style={{
                              width: '100%'
                            }}
                            layout='inline'
                            initialValues={{ name: challageElement.value }}
                            onFinish={(store) => handleFinish(store, challageElement, 'challange')}
                          >
                            <Form.Item name="name">
                              <Input
                                size="small"
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                size="small"
                                style={{
                                  top: 0,
                                  left: -15,
                                  alignContent: 'center',
                                  marginTop: 5
                                }}
                                type='text'
                                htmlType="submit"
                              >
                                <MdDone 
                                  className="Icons edit"
                                />
                              </Button>
                            </Form.Item>
                          </Form>
                        ) : (
                          <>
                            {challageElement.value}
                            <MdEdit 
                              key={challageElement.value}
                              size={15}
                              className='Icons edit'
                              onClick={() => handleEdit(challageElement, 'challange')}
                            />
                            <MdClear
                              size={15}
                              className='remove'
                              onClick={() => 
                                setChallageArray(
                                  [...handleRemoveArray(index, 'challange')])}
                            />
                          </>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ margin: 7 }}>
                  <span>
                    Correspondentes atividades da monitoria
                    <br />
                  </span>
                  <TextArea
                    placeholder=""
                    id="activity"
                    onChange={event =>
                      insertLine(event.target.value, event.target.id)}
                    value={activities}
                    style={{ width: '81%' }}
                    autoSize
                    allowClear
                  />
                  <Button
                    onClick={() => {
                      addToScreen(2);
                      setActivities('');
                      insertLine('', 'activity');
                    }}
                    disabled={!stateActivity}
                  >
                    +
                  </Button>
                  <ul>
                    {activitiesArray.map((activitiesElement, index) =>
                      <li key={activitiesElement.value}>
                        {(activitiesElement.editing) ? (
                          <Form
                            initialValues={{ name: activitiesElement.value }}
                            layout="inline"
                            style={{ width: '100%' }}
                            onFinish={(store) => handleFinish(store, activitiesElement, 'activities')}
                          >
                            <Form.Item name="name">
                              <Input
                                size="small"
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                size="small"
                                style={{
                                  top: 0,
                                  left: -15,
                                  alignContent: 'center',
                                  marginTop: 5
                                }}
                                type='text'
                                htmlType="submit"
                              >
                                <MdDone 
                                  className="Icons edit"
                                />
                              </Button>
                            </Form.Item>
                          </Form>
                        ) : (
                          <>
                            {activitiesElement.value}
                            <MdEdit 
                              key={activitiesElement.value}
                              size={15}
                              className='Icons edit'
                              onClick={() => handleEdit(activitiesElement, 'activities')}
                            />
                            <MdClear
                              size={15}
                              className='remove'
                              onClick={() => 
                                setActivitiesArray(
                                  [...handleRemoveArray(index, 'activities')]
                                )}
                            />
                          </>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ margin: 7 }}>
                  <span style={{ marginInlineEnd: 15 }}>
                    Estratégia para alcançar os estudantes
                  </span>
                  <TextArea
                    style={{ width: '83%' }}
                    placeholder=""
                    id="strategy"
                    onChange={event =>
                      insertLine(event.target.value, event.target.id)}
                    value={strategies}
                    autoSize
                    allowClear
                  />
                  <Button 
                    onClick={() => {
                      addToScreen(3);
                      setStrategies('');
                      insertLine('', 'strategy');
                    }}
                    disabled={!stateStrategy}
                  >
                    +
                  </Button>
                  <ul>
                    {strategiesArray.map((strategiesElement, index) =>
                      <li key={strategiesElement.value}>
                        {(strategiesElement.editing) ? (
                          <Form
                            initialValues={{ name: strategiesElement.value }}
                            layout="inline"
                            style={{ width: '100%' }}
                            onFinish={(store) => handleFinish(store, strategiesElement, 'strategies')}
                          >
                            <Form.Item name="name">
                              <Input
                                size="small"
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                size="small"
                                style={{
                                  top: 0,
                                  left: -15,
                                  alignContent: 'center',
                                  marginTop: 5
                                }}
                                type='text'
                                htmlType="submit"
                              >
                                <MdDone 
                                  className="Icons edit"
                                />
                              </Button>
                            </Form.Item>
                          </Form>
                        ) : (
                          <>
                            {strategiesElement.value}
                            <MdEdit 
                              key={strategiesElement.value}
                              size={15}
                              className='Icons edit'
                              onClick={() => handleEdit(strategiesElement, 'strategies')}
                            />
                            <MdClear
                              size={15}
                              className='remove'
                              onClick={() => 
                                setStrategiesArray(
                                  [...handleRemoveArray(index, 'strategies')])}
                            />
                          </>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              </Col>
            </Row>
            <Button
              style={{
                width: '100%',
                marginTop: 3,
                marginBottom: 3
              }}
              onClick={() => addValuesToTable()}
              disabled={
                ((challageArray.length
                  && activitiesArray.length 
                  && strategiesArray.length) === 0 )
              }
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