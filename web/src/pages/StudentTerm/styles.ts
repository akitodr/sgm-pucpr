import styled from 'styled-components';
import BackgroundImage from '../../assets/background_image.png';

export const Container = styled.div`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;

  width: 100%;
  height: 6rem;
  float: right;
  padding: 1rem;
  background: #fff;
  position: fixed;
  box-shadow: 0 1px 5px #999;
  div {
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    img {
      display: block;
      max-height: 100%;
      max-width: 100%;
      margin-right: 1rem;
      margin-left: 1rem;
    }
    svg {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
`;

export const FormContainer = styled.div`
  background: #fff;
  padding: 1.2rem 2rem;
  border-radius: 6px;
  box-shadow: 0px 1px 8px #aaa;
  width: 70%;

  p {
    text-align: justify;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  span {
    font-weight: bold;
  }

  .terms {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 3rem;
  }

  .table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
    
    .ant-input {
      width: 33%;
    }
  }

  .first-line {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 1rem;
  }

  .second-line {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .third-line {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .fourth-line {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .fifth-line {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .sixth-line {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .seventh-line {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .ant-input-number {
    width: 100%;
    background-color: #fff;
  }

  .ant-input {
    background-color: #fff;
  }

  .ant-form-item-label > label {
    color: var(--text-color-secondary);
  }

  .second-column {
    display: flex;
    flex-direction: column;

    button {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;
