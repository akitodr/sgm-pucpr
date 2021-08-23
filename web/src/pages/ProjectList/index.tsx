import { Table, Input } from 'antd';
import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Header } from '../StudentTerm/styles';
import logoMonitoria from '../../assets/Logo-Monitoria.svg';
import { TableItem } from '../Students/styles';
import { Container } from './styles';

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
      </Container>
    </div>
  );
};

export default AppraisaProject;