import React from 'react';
import { Route } from 'react-router-dom';


import Login from './pages/Login';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Projects from './pages/Projects';
import Others from './pages/Others';
import ProjectList from './pages/ProjectList';
import StudentTerm from './pages/StudentTerm';
import FormStudent from './pages/Students/FormStudent';
import FormTeacher from './pages/Teachers/FormTeacher';
import FormProject from './pages/Projects/FormProject';
import FormStudentProject from './pages/Projects/FormProject/FormStudentProject';
import NewProjectSubmission from './pages/NewProjectSubmissionForm';
import FinalReportLessForm from './pages/FinalReportLessForm';
import FinalReportMoreForm from './pages/FinalReportMoreForm';
import FinalReportMoreFormClass from './pages/FinalReportMoreFormClass';
import FinalReportLessFormClass from './pages/FinalReportLessFormClass';

const Routes = () => {
  return (
    <>
      <Route component={Login} path="/" exact />
      <Route component={Projects} path="/projects" exact />
      <Route component={FormProject} path="/projects/new" />
      <Route component={FormProject} path="/projects/:id/edit" />
      <Route component={FormStudentProject} path="/project-students/:id/edit" />
      <Route component={Students} path="/students" exact />
      <Route component={FormStudent} path="/students/new" />
      <Route component={FormStudent} path="/students/:id/edit" />
      <Route component={Teachers} path="/teachers" exact />
      <Route component={FormTeacher} path="/teachers/new" />
      <Route component={FormTeacher} path="/teachers/:id/edit" />
      <Route component={Others} path="/others" />
      <Route component={ProjectList} path="/projects/list" />
      <Route component={StudentTerm} path="/terms-of-service" />
      <Route component={NewProjectSubmission} path="/new-project-submission" />
      <Route component={FinalReportLessForm} path="/final-report-less-form" exact />
      <Route component={FinalReportMoreForm} path="/final-report-more-form" exact />
      <Route component={FinalReportMoreFormClass} path="/final-report-more-form-class" />
      <Route component={FinalReportLessFormClass} path="/final-report-less-form-class" />
    </>
  );
};

export default Routes;