import React, { useEffect, useState } from 'react';

import { Button, Table, Input, Modal, Spin, Tooltip } from 'antd';
import {
  FileAddOutlined,
  UploadOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { FaFileExcel } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Link } from 'react-router-dom';

import Dropzone from '../../components/Dropzone';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Container, ModalContent, TableItem } from './styles';
import ProjectsService from '../../services/projects.service';
import { Footer } from '../../components/Footer';

const Projects: React.FC = () => {
  const columns = [
    {
      title: 'Id do Projeto',
      dataIndex: 'id',
    },
    {
      title: 'Código do Projeto',
      dataIndex: 'code',
    },
    {
      title: '',
      dataIndex: 'icon',
    },
  ];
  interface Project {
    id: number,
    code: string,
  }

  const perPage = 15;
  const { Search } = Input;

  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalState, setModalState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useBottomScrollListener(() => setPage(page + 1));

  useEffect(() => {
    ProjectsService.get(page, perPage, searchTerm).then((response) => {
      const { data } = response;
      if (page === 1) setProjects(data.data);
      else setProjects([...projects, ...data.data]);
      setPage(data.meta.current_page);
    });
  }, [page]);
  
  useEffect(() => {
    setProjects([]);
    setPage(1);
    ProjectsService.get(1, perPage, searchTerm).then((response) => {
      const { data } = response;
      setProjects([...data.data]);
    });
  }, [searchTerm]);

  const removeFile = (file: File) => {
    const newFiles = [...selectedFiles];
    const newMessages = [...errorMessages];
    const index = newFiles.indexOf(file);
    newMessages.splice(index, 1);
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    setErrorMessages(newMessages);
  };

  function closeModal() {
    setModalState(false);
    setErrorMessages([]);
    setSelectedFiles([]);
  }

  async function uploadFile(file: File) {
    const data = new FormData();
    data.append('file', file);
    await ProjectsService.import(data);
  }

  async function uploadAllFiles() {
    setLoading(true);
    const messages = [];
    for (let i = errorMessages.length; i < selectedFiles.length; i++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await uploadFile(selectedFiles[i]);
        messages.push('');
      } catch ({ response }) {
        messages.push(response.data.message);
      }
    }
    setErrorMessages([...errorMessages, ...messages]);
    setLoading(false);
    setPage(0);
    setPage(1);
  }

  return (
    <DashboardLayout>
      <Container>
        <Search
          placeholder="Pesquisar..."
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: 350 }}
        />

        <div className="buttons">
          <Link to="/projects/new">
            <Button type="primary" className="newButton">
              <FileAddOutlined /> Novo
            </Button>
          </Link>
          <Button
            type="primary"
            className="uploadButton"
            onClick={() => setModalState(true)}
          >
            <UploadOutlined /> Importar
          </Button>
        </div>
        <Modal
          title="Importar"
          visible={modalState}
          onCancel={(e) => closeModal()}
          footer={null}
          width={800}
        >
          <ModalContent>
            <Spin tip="Carregando..." spinning={loading}>
              <div className="drop-files-field">
                <Dropzone
                  setSelectedFiles={setSelectedFiles}
                  selectedFiles={selectedFiles}
                />
                <div className="file-list">
                  <h4>Arquivos Carregados:</h4>
                  <ul>
                    {selectedFiles.map((file: File, index) => (
                      <li key={file.name}>
                        <div className="file-info">
                          <FaFileExcel />
                          <div>
                            <p>{file.name}</p>
                            <span className="file-size-text">
                              {(file.size / 1e6).toFixed(2)} mb
                            </span>
                          </div>
                        </div>
                        {errorMessages.length - 1 >= index &&
                          (errorMessages[index] === '' ? (
                            <CheckCircleOutlined className="green" />
                          ) : (
                            <Tooltip title={errorMessages[index]}>
                              <CloseCircleOutlined className="red" />
                            </Tooltip>
                          ))}
                        <MdDeleteForever
                          className="red"
                          size={22}
                          onClick={() => removeFile(file)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '1rem',
                }}
              >
                <Button type="primary" onClick={() => uploadAllFiles()}>
                  Importar
                </Button>
              </div>
            </Spin>
          </ModalContent>
        </Modal>
      </Container>
      <TableItem>
        <Table
          locale={{ emptyText: 'Nenhum Projeto Encontrado' }}
          columns={columns}
          dataSource={projects?.map((_) => ({
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
    </DashboardLayout>
  );
};

export default Projects;
