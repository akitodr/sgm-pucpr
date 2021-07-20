import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  InputNumber,
  Checkbox,
} from 'antd';
import { FaEllipsisH } from 'react-icons/fa';

import logoMonitoria from '../../assets/Logo-Monitoria.svg';
import { Header, Container, FormContainer } from './styles';

import SchoolService from '../../services/schools.service';
import ProjectsService from '../../services/projects.service';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const StudentTerm: React.FC = () => {
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

  interface Discipline {
    id: number;
    name: string;
  }

  interface Project {
    id: number;
    code: string;
  }

  const [form] = Form.useForm();
  const { Option } = Select;

  const [schools, setSchools] = useState<School[]>();
  const [courses, setCourses] = useState<Course[]>();
  const [projects, setProjects] = useState<Project[]>();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [checkboxValue, setCheboxValue] = useState<boolean>(false);

  useEffect(() => {
    SchoolService.get().then((response) => {
      setSchools(response.data);
    });
    ProjectsService.getAll().then((response) => {
      setProjects(response.data);
    });
  }, []);

  function loadSchoolCourses(schoolId: number) {
    SchoolService.getCourses(schoolId).then((response) => {
      setCourses(response.data);
      if (response.data.length)
        form.setFieldsValue({ course_id: response.data[0].id });
    });
  }

  function loadDisciplines(projectId: number) {
    ProjectsService.getDisciplines(projectId).then((response) => {
      setDisciplines(response.data);
    });
  }

  const validateMessages = {
    required: 'Campo Obrigatório',
    types: {
      email: '${label} inválido!',
      number: '${label} não é um número válido!',
    },
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
          <h2>Termo De Compromisso - 2º Semestre de 2021</h2>
          <p>
            De acordo com a regulamentação do Programa de Monitorias, a
            Pontifícia Universidade Católica Do Paraná admite o(a):
          </p>
          <Form
            form={form}
            layout="vertical"
            name="nest-messages"
            onFinish={() => console.log('Done')}
            validateMessages={validateMessages}
          >
            <div className="first-line">
              <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>

            <div className="second-line">
              <Form.Item
                name="birth_date"
                label="Data de Nascimento"
                rules={[{ required: true }]}
              >
                <DatePicker
                  // defaultValue={moment('19/05/1222', 'DD-MM-YYYY')}
                  format="DD/MM/YYYY"
                  placeholder="Selecione uma data"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                name="registration"
                label="Matrícula"
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

            <div className="third-line">
              <Form.Item
                name="email"
                label="E-mail Pessoal"
                rules={[{ type: 'email' }, { required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="institutional_email"
                label="E-mail Institucional"
                rules={[{ type: 'email' }, { required: true }]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="fourth-line">
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
                  {schools?.map((school) => (
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
                  {courses?.map((course) => (
                    <Option key={course.id} value={course.id}>
                      {course.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="fifth-line">
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
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

              <Form.Item
                name="project-number"
                label="Nº do Projeto"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  placeholder="Selecione um Projeto"
                  optionFilterProp="children"
                  onChange={(value) => loadDisciplines(value as number)}
                  // defaultValue="course_id"
                >
                  {projects?.map((project) => (
                    <Option key={project.id} value={project.id}>
                      {project.code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="sixth-line">
              <Form.Item
                name="chr"
                label="Carga horária semanal remunerada"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={8} />
              </Form.Item>
              <Form.Item
                name="chv"
                label="Carga horária semanal voluntária"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={8} />
              </Form.Item>
            </div>

            <div className="seventh-line">
              <Form.Item
                name="class_number"
                label="Número de horas em sala ou laboratório"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={8} />
              </Form.Item>
              <Form.Item
                name="extraclass_number"
                label="Número de horas extraclasse"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={8} />
              </Form.Item>
            </div>

            <Form.Item
              name="disciplines"
              label="Disciplinas"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="Selecione uma ou mais disciplina(s)"
                defaultValue={[]}
                optionFilterProp="children"
              >
                {disciplines?.map((discipline) => (
                  <Option value={discipline.id} key={discipline.id}>
                    {discipline.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <p>
              no quadro de estudantes monitores para realizar as atividades de
              monitoria, as quais serão regidas pelas cláusulas e condições
              seguintes:
            </p>

            <div className="terms">
              <div className="first-column">
                <p>
                  <span>CLÁUSULA 1ª</span> - O presente Termo de Compromisso de
                  Monitoria (TCM) tem por finalidade particularizar a relação
                  jurídica especial existente entre o MONITOR e a PONTIFÍCIA
                  UNIVERSIDADE CATÓLICA DO PARANÁ, caracterizando a não
                  vinculação empregatícia.
                </p>

                <p>
                  <span>CLÁUSULA 2ª</span> - Fica compromissado entre as partes
                  as seguintes condições básicas de realização de monitoria:
                </p>
                <p>
                  a) O presente TCM terá vigência durante o 1º Semestre de 2020,
                  com início na data acima informada, e término ao final do mês
                  de junho, em datas fixadas no calendário acadêmico vigente,
                  podendo ser cancelado a qualquer tempo, seguindo o exposto na
                  cláusula 6ª do presente Termo de Compromisso de Monitoria.
                </p>
                <p>b) São deveres e atribuições do monitor:</p>
                <p>
                  I. atender estudantes, em grupos ou individualmente, para
                  esclarecimento de dúvidas e orientação de atividades relativas
                  à(s) disciplina(s) vinculada(s) à monitoria;{' '}
                </p>
                <p>
                  II. participar na elaboração de material didático e aulas
                  práticas sob orientação do professor da disciplina vinculada à
                  monitoria;
                </p>
                <p>
                  III. participar, havendo interesse do professor orientador e
                  compatibilidade de horários, de aulas da disciplina em que é
                  monitor.
                </p>
                <p>
                  IV. cumprir as horas previstas no plano de atividades,
                  conforme horários pré-estabelecidos com o professor
                  orientador;
                </p>
                <p>
                  V. efetuar periodicamente o controle e registro dos
                  atendimentos e atividades desenvolvidas, visando à obtenção de
                  subsídios para a elaboração do relatório final da monitoria;
                </p>
                <p>
                  VI. reunir-se periodicamente com o professor orientador para
                  receber orientações e informá-lo sobre o andamento das
                  atividades com os estudantes, exceto na hipótese de monitoria
                  exercida exclusivamente em sala de aula;
                </p>
                <p>
                  VII. realizar os estudos necessários à boa condução das
                  atividades de monitoria;
                </p>
                <p>
                  VIII. elaborar o relatório final da monitoria, na hipótese de
                  projeto com monitoria exclusivamente em sala de aula.
                </p>
                <p>
                  IX. apoiar o professor orientador na correção de atividades
                  dos estudantes, sem, no entanto, responsabilizar-se pelo
                  parecer final.
                </p>
                <p>
                  X. Elaborar relatórios parciais sempre que solicitado pelo
                  Programa de Monitorias.
                </p>
                <p>
                  c) O monitor cujo relatórios de atividades tenham sido
                  devidamente entregues, no prazo, receberá um certificado de
                  atuação como monitor, com a carga horária semanal de
                  monitoria. Em caso de não entrega de algum dos relatórios
                  solicitados não haverá emissão do certificado.
                </p>
              </div>

              <div className="second-column">
                <p>
                  d) O monitor não poderá desenvolver atividades em substituição
                  ao professor ou realizar atividades administrativas.
                </p>
                <p>
                  e) É facultada aos estudantes de pós-graduação stricto sensu
                  monitores a possibilidade de ministrar aulas, além das horas
                  presenciais de atendimento aos estudantes, com a presença do
                  professor da disciplina e limitado a 20% da carga horária da
                  disciplina.
                </p>

                <p>
                  <span>CLÁUSULA 3ª</span>- O valor mensal da bolsa de monitoria
                  é determinado pela Resolução N.º 066/2019 CONAF, sendo
                  fracionado proporcionalmente ao regime de dedicação de cada
                  monitor. A saber: 8 horas = R$ 456,00; 6 horas = R$ 342,00; 4
                  horas = 228,00; 2 horas = R$ 114,00. É permitido ao estudante
                  monitor estar vinculado a mais de um projeto de monitoria. No
                  entanto, a carga horária remunerada total não poderá exceder 8
                  horas semanais, conforme resolução aprovada por colegiado
                  institucional competente. O pagamento da bolsa auxílio será
                  realizado por ordem de pagamento ou crédito em conta corrente
                  de titularidade do estudante monitor (não pode ser conjunta ou
                  poupança). A coleta de dados pessoais e bancários somente
                  poderá ser realizada através de e-mail institucional
                  criptografado, as orientações de como criptografar se
                  encontram disponíveis no Blackboard, na aba Apoio ao estudante
                  - Monitorias.
                </p>

                <p>
                  <span>CLÁUSULA 4ª</span>- O fato de a monitoria não estar
                  vinculada à concessão de bolsa, não desobriga o estudante
                  monitor e o professor orientador ao cumprimento das normas
                  previstas nos regulamentos internos.
                </p>

                <p>
                  <span>CLÁUSULA 5ª</span>- Poderá o Programa de Monitorias
                  fazer uso de imagem do estudante monitor, capturada dentro das
                  dependências desta Universidade, para fins acadêmicos e
                  educacionais, em redes sociais, tais como: Facebook e
                  Instagram.
                </p>

                <p>
                  <span>CLÁUSULA 6ª</span>- Constituem motivos para o
                  cancelamento automático da vigência do presente Termo de
                  Compromisso de Monitoria:
                </p>
                <p>I. suspensão imposta pela Instituição ao aluno;</p>
                <p>II. trancamento de matrícula;</p>
                <p>III. pela conclusão de curso;</p>
                <p>
                  IV. por indicação do professor responsável pelo projeto ao
                  qual o monitor está vinculado, após parecer do Coordenador do
                  Curso, do Decano ou Diretor de Campus.
                </p>

                <p>
                  E por estarem de comum acordo com as condições deste Termo de
                  Compromisso, as partes o assinam, em 2 (duas) vias de igual
                  teor.
                </p>

                <Checkbox
                  onChange={(e: CheckboxChangeEvent) =>
                    setCheboxValue(e.target.checked)
                  }
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ut quam nec eros cursus euismod. Donec molestie justo ac est
                  commodo, eu ultricies lorem mattis. Nulla quis neque rhoncus
                  augue scelerisque pharetra. Curabitur porttitor imperdiet erat
                  sed finibus. Curabitur id nisi a turpis bibendum molestie ac
                  at dolor.
                </Checkbox>

                <Button type="primary" htmlType="submit" disabled={!checkboxValue}>
                  CONCORDAR E ASSINAR
                </Button>
              </div>
            </div>
          </Form>
        </FormContainer>
      </Container>
    </div>
  );
};

export default StudentTerm;
