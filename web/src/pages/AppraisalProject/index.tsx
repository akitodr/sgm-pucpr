import { Table, Input } from 'antd';
import React from 'react';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { TableItem } from '../Students/styles';

const AppraisaProject: React.FC = () => {
  const { Search } = Input;

  const columns = [
    {
      title:'ID',
      dataIndex: 'id'
    },
    {
      title: 'Projeto',
      dataIndex: 'project'
    },
    {
      title: 'Submetido por',
      dataIndex: 'submited'
    },
    {
      title: 'Nota',
      dataIndex: 'grade'
    },
    {
      title: '',
      render: () => (
        <Link to='/'>
          <MdEdit size={18} />
        </Link>
      )
    }
  ];

  const dataSource = [
    {
      id: '1',
      project: 'P002',
      submited: 'Adiel Felipe Felisberto da Silva',
      grade: '6,2'
    }
  ];

  return (
    <DashboardLayout>
      <Search
        style={{ width: 200 }}
        placeholder="Pesquisar..."
      />
      <TableItem>
        <Table 
          locale={{ emptyText: 'Nenhum Estudante Encontrado' }}
          columns={columns}
          dataSource={dataSource}
          size="middle"
          pagination={false}
        />
      </TableItem>
    </DashboardLayout>
  );
};

export default AppraisaProject;