import styled from 'styled-components';
import BackgroundImage from '../../assets/background_image.png';

export const Container = styled.div`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  background: #f3f3f3;
  width: 100%;
  max-width: 24em;
  padding: 2rem 3rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  color: #676261;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 2rem;
  }

  Input {
    display: block;
    width: 15rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: .5rem;
  }

  Button {
    display: block;
    width: 15rem;
    height: 2.5rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    font-size: 1rem;
  }
`;
