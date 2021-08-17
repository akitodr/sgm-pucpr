import React from 'react';
import { FaUserGraduate, FaUserFriends, FaBoxOpen, FaAward, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import logoMonitoria from  '../../assets/Logo-Monitoria.svg';
import logoPuc from  '../../assets/Logo-PUC.svg';
import { Footer } from '../../components/Footer';

import { Header, SideMenu, Container } from './styles';

const DashboardLayout: React.FC = ({ children }) => (
  <>
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
      <SideMenu>
        <ul>
          <li>
            <Link to="/projects">
              <FaBoxOpen size={32} />
              <span>PROJETOS</span>
            </Link>
          </li>
          <li>
            <Link to="/students">
              <FaUserGraduate size={32} />
              <span>MONITORES</span>
            </Link>
          </li>
          <li>
            <Link to="/teachers">
              <FaUserFriends size={32} />
              <span>ORIENTADORES</span>
            </Link>
          </li>
          <li>
            <Link to="/others">
              <FaAward size={32} />
              <span>OUTROS</span>
            </Link>
          </li>
        </ul>
        <img src={logoPuc} alt="Logo" />
      </SideMenu>
      <Container>
        { children }
      </Container>
    
    </div>
    <Footer 
      title="Este site usa cookies para melhorar a sua experiência"
      msg="Ao usar esse site você concorda em compartilhar cookies de navegação para que possamos melhorar sua experiência com o site."
    />
  </>
);

export default DashboardLayout;