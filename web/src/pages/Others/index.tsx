import React, { useEffect, useState } from 'react';
import { List, Input, Select, Divider, Modal, Button, Form } from 'antd';
import { MdAdd, MdEdit, MdDeleteForever, MdClear } from 'react-icons/md';

import { Store } from 'antd/lib/form/interface';
import Collapse from '../../components/Collapse';
import { CollapseItem, Container } from './styles';
import CampusService from '../../services/campus.service';
import SchoolService from '../../services/schools.service';
import CourseService from '../../services/courses.service';
import DashboardLayout from '../../layouts/DashboardLayout';

const { Option } = Select;

interface Course {
  id: number;
  name: string;
  school_id?: number;
}

interface School {
  id: number;
  name: string;
  newCourse?: boolean;
  campus_id: number;
  loaded?: boolean;
  editing?: boolean;
}

interface Campus {
  id: number;
  name: string;
  newSchool?: boolean;
  loaded?: boolean;
  editing?: boolean;
}

const Others: React.FC = () => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [newCampus, setNewCampus] = useState<boolean>(false);

  useEffect(() => {
    CampusService.get().then((response) => {
      setCampuses(response.data);
    });
    CourseService.get().then((response) => {
      setAllCourses(response.data);
    });
  }, []);

  const panelHeader = (
    <CollapseItem>
      <span>Câmpus</span>
      <MdAdd
        size={22}
        style={{ color: 'var(--background-button-color)' }}
        onClick={() => setNewCampus(true)}
      />
    </CollapseItem>
  );

  function loadCampus(campus: Campus) {
    if (!campus.loaded) {
      setCampuses(
        campuses.map((_) => (_ === campus ? { ..._, loaded: true } : _))
      );
      const promise = CampusService.getSchools(campus.id);
      promise
        .then((response) => {
          setSchools([...response.data, ...schools]);
        })
        .catch((reason) =>
          setCampuses(
            campuses.map((_) => (_ === campus ? { ..._, loaded: false } : _))
          )
        );
      return promise;
    }
    return undefined;
  }

  function loadSchool(school: School) {
    if (!school.loaded) {
      setSchools(
        schools.map((_) => (_ === school ? { ..._, loaded: true } : _))
      );
      const promise = SchoolService.getCourses(school.id);
      promise
        .then((response) => {
          setCourses([
            ...response.data.map((course: Course) => ({
              ...course,
              school_id: school.id,
            })),
            ...courses,
          ]);
        })
        .catch((reason) =>
          setSchools(
            schools.map((_) => (_ === school ? { ..._, loaded: false } : _))
          )
        );
      return promise;
    }
    return undefined;
  }

  function createNewCampus(values: Store) {
    CampusService.create(values.name).then((response) => {
      const { id, name } = response.data;
      setCampuses([...campuses, { id, name }]);
      setNewCampus(false);
    });
  }

  function showNewSchoolField(campus: Campus) {
    setCampuses(
      campuses.map((_) => {
        if (_ !== campus) return _;
        return { ..._, newSchool: true };
      })
    );
  }

  function createNewSchool(values: Store, campus: Campus) {
    SchoolService.create(values.name, campus.id).then((response) => {
      const { id, name } = response.data;
      setSchools([...schools, { id, name, campus_id: campus.id }]);
      setCampuses(
        campuses.map((_) => {
          if (_ !== campus) return _;
          return { ..._, newSchool: false };
        })
      );
    });
  }

  function showNewCourseField(school: School) {
    setSchools(
      schools.map((_) => {
        if (_ !== school) return _;
        return { ..._, newCourse: true };
      })
    );
  }

  function addNewCourse(values: Store, school: School) {
    const course = allCourses.find((_) => _.id === values.course);
    if (course) {
      SchoolService.addCourse(school.id, course.id).then((response) => {
        const { id, name } = course;
        setCourses([...courses, { id, name, school_id: school.id }]);
        setSchools(
          schools.map((_) => {
            if (_ !== school) return _;
            return { ..._, newCourse: false, selectedCourse: undefined };
          })
        );
      });
    }
  }

  async function deleteCampus(campus: Campus) {
    let campusSchools;
    if (!campus.loaded) {
      const response = await loadCampus(campus);
      campusSchools = response?.data;
    } else campusSchools = schools.filter((_) => _.campus_id === campus.id);

    if (campusSchools.length > 0)
      Modal.error({
        title: 'Erro',
        content: `Não é possível excluir o ${campus.name}. É preciso excluir todas as escolas antes de deletar um Câmpus.`,
      });
    else {
      Modal.confirm({
        title: 'Excluir Câmpus',
        content: `Tem certeza que deseja excluir o ${campus.name}?`,
        okText: 'Sim',
        cancelText: 'Cancelar',
        okButtonProps: { danger: true },
        onOk: () => {
          CampusService.delete(campus.id).then((response) => {
            setCampuses(campuses.filter((_) => _.id !== campus.id));
          });
        },
      });
    }
  }

  async function deleteSchool(school: School) {
    let schoolCourses;
    if (!school.loaded) {
      const response = await loadSchool(school);
      schoolCourses = response?.data;
    } else schoolCourses = courses.filter((_) => _.school_id === school.id);

    if (schoolCourses.length > 0)
      Modal.error({
        title: 'Erro',
        content: `Não é possível excluir a Escola ${school.name}. É preciso excluir todos os cursos antes de deletar uma Escola.`,
      });
    else {
      Modal.confirm({
        title: 'Excluir Escola',
        content: `Tem certeza que deseja excluir a Escola ${school.name}?`,
        okText: 'Sim',
        cancelText: 'Cancelar',
        okButtonProps: { danger: true },
        onOk: () => {
          SchoolService.delete(school.id).then((response) => {
            setSchools(schools.filter((_) => _.id !== school.id));
          });
        },
      });
    }
  }

  function deleteCourse(school: School, course: Course) {
    Modal.confirm({
      title: 'Excluir Curso',
      content: `Tem certeza que deseja excluir o Curso ${course.name}?`,
      okText: 'Sim',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk: () => {
        SchoolService.deleteCourse(school.id, course.id).then((response) => {
          setCourses(courses.filter((_) => _.id !== course.id));
        });
      },
    });
  }

  function createNewCourse(values: Store) {
    CourseService.create(values.name).then((response) => {
      const { id, name } = response.data;
      setAllCourses([...allCourses, { id, name }]);
    });
  }

  function handleEditCampus(campus: Campus) {
    setCampuses(
      campuses.map((_) => {
        if (_ !== campus) return _;
        return { ..._, editing: true };
      })
    );
  }

  function handleEditSchool(school: School) {
    setSchools(
      schools.map((_) => {
        if (_ !== school) return _;
        return { ..._, editing: true };
      })
    );
  }

  function editCampus({ name }: Store, campus: Campus) {
    CampusService.update(campus.id, name).then((response) => {
      setCampuses(
        campuses.map((_) => {
          if (_ !== campus) return _;
          return { ..._, name, editing: false };
        })
      );
    });
  }

  function editSchool({ name }: Store, school: School) {
    SchoolService.update(school.id, name).then((response) => {
      setSchools(
        schools.map((_) => {
          if (_ !== school) return _;
          return { ..._, name, editing: false };
        })
      );
    });
  }

  return (
    <DashboardLayout>
      <Container>
        <Collapse render={() => panelHeader} startExpanded>
          {campuses.map((campus) => (
            <Collapse
              key={campus.id}
              onChange={(_) => loadCampus(campus)}
              render={() => (
                <CollapseItem>
                  {campus.editing ? (
                    <Form
                      layout="inline"
                      style={{ width: '100%' }}
                      initialValues={{ name: campus.name }}
                      onFinish={(store) => editCampus(store, campus)}
                    >
                      <Form.Item style={{ width: '35%' }} name="name">
                        <Input />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Salvar
                        </Button>
                      </Form.Item>
                    </Form>
                  ) : (
                    <>
                      <span>{campus.name}</span>
                      <div>
                        <MdAdd
                          size={22}
                          style={{ color: 'var(--background-button-color)' }}
                          onClick={() => showNewSchoolField(campus)}
                        />
                        <MdEdit
                          size={20}
                          onClick={() => handleEditCampus(campus)}
                        />
                        <MdDeleteForever
                          size={22}
                          style={{
                            color: 'var(--background-button-danger-color)',
                          }}
                          onClick={() => deleteCampus(campus)}
                        />
                      </div>
                    </>
                  )}
                </CollapseItem>
              )}
            >
              {schools.map(
                (school) =>
                  school.campus_id === campus.id && (
                    <Collapse
                      key={school.id}
                      onChange={(_) => loadSchool(school)}
                      render={() => (
                        <CollapseItem>
                          {school.editing ? (
                            <Form
                              layout="inline"
                              style={{ width: '100%' }}
                              initialValues={{ name: school.name }}
                              onFinish={(store) => editSchool(store, school)}
                            >
                              <Form.Item style={{ width: '35%' }} name="name">
                                <Input />
                              </Form.Item>
                              <Form.Item>
                                <Button type="primary" htmlType="submit">
                                  Salvar
                                </Button>
                              </Form.Item>
                            </Form>
                          ) : (
                            <>
                              <span>{school.name}</span>
                              <div>
                                <MdAdd
                                  size={22}
                                  style={{
                                    color: 'var(--background-button-color)',
                                  }}
                                  onClick={() => showNewCourseField(school)}
                                />
                                <MdEdit
                                  size={20}
                                  onClick={() => handleEditSchool(school)}
                                />
                                <MdDeleteForever
                                  size={22}
                                  style={{
                                    color:
                                      'var(--background-button-danger-color)',
                                  }}
                                  onClick={() => deleteSchool(school)}
                                />
                              </div>
                            </>
                          )}
                        </CollapseItem>
                      )}
                    >
                      {school.loaded && (
                        <List
                          locale={{ emptyText: 'Lista Vazia' }}
                          size="small"
                          dataSource={courses.filter((_) => {
                            return _.school_id === school.id;
                          })}
                          renderItem={(course) => (
                            <List.Item>
                              <CollapseItem>
                                {course.name}
                                <div>
                                  {/* <MdEdit size={18} /> */}
                                  <MdClear
                                    size={20}
                                    style={{
                                      color:
                                        'var(--background-button-danger-color)',
                                    }}
                                    onClick={() => deleteCourse(school, course)}
                                  />
                                </div>
                              </CollapseItem>
                            </List.Item>
                          )}
                        >
                          {school.newCourse ? (
                            <List.Item>
                              <CollapseItem>
                                <Form
                                  onFinish={(store) =>
                                    addNewCourse(store, school)}
                                  layout="inline"
                                  style={{ width: '100%' }}
                                >
                                  <Form.Item
                                    name="course"
                                    style={{ width: '35%' }}
                                  >
                                    <Select
                                      showSearch
                                      placeholder="Selecione um curso"
                                      optionFilterProp="children"
                                      dropdownRender={(menu) => (
                                        <div>
                                          {menu}
                                          <Divider
                                            style={{ margin: '4px 0' }}
                                          />
                                          <Form
                                            layout="inline"
                                            style={{
                                              width: '100%',
                                              display: 'table',
                                              borderSpacing: '0.5rem',
                                            }}
                                            onFinish={createNewCourse}
                                          >
                                            <Form.Item
                                              name="name"
                                              style={{
                                                width: '100%',
                                                display: 'table-cell',
                                              }}
                                            >
                                              <Input style={{ flex: 'auto' }} />
                                            </Form.Item>
                                            <Form.Item
                                              style={{
                                                width: 'auto',
                                                display: 'table-cell',
                                                whiteSpace: 'nowrap',
                                              }}
                                            >
                                              <Button
                                                type="primary"
                                                htmlType="submit"
                                              >
                                                Adicionar
                                              </Button>
                                            </Form.Item>
                                          </Form>
                                        </div>
                                      )}
                                    >
                                      {allCourses.map((course) => (
                                        <Option
                                          key={course.id}
                                          value={course.id}
                                        >
                                          {course.name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                      Adicionar
                                    </Button>
                                  </Form.Item>
                                </Form>
                              </CollapseItem>
                            </List.Item>
                          ) : undefined}
                        </List>
                      )}
                    </Collapse>
                  )
              )}
              {campus.newSchool ? (
                <Collapse
                  render={() => (
                    <CollapseItem>
                      <Form
                        onFinish={(store) => createNewSchool(store, campus)}
                        layout="inline"
                        style={{ width: '100%' }}
                      >
                        <Form.Item name="name" style={{ width: '35%' }}>
                          <Input placeholder="Nome da Escola" autoFocus />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Adicionar
                          </Button>
                        </Form.Item>
                      </Form>
                    </CollapseItem>
                  )}
                />
              ) : undefined}
            </Collapse>
          ))}
          {newCampus ? (
            <Collapse
              render={() => (
                <CollapseItem>
                  <Form
                    onFinish={createNewCampus}
                    layout="inline"
                    style={{ width: '100%' }}
                  >
                    <Form.Item name="name" style={{ width: '35%' }}>
                      <Input placeholder="Nome do Campus" autoFocus />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Adicionar
                      </Button>
                    </Form.Item>
                  </Form>
                </CollapseItem>
              )}
            />
          ) : undefined}
        </Collapse>
      </Container>
    </DashboardLayout>
  );
};

export default Others;
