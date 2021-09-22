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
  width: 75%;

  .primary-button {
    width: 30%;
    margin-top: 2rem;
    float: right;
  }

  .fisrt-line {
    display: grid;
    grid-template-columns: 1.5fr 2fr 3fr;
    grid-column-gap: 1rem;
  }

  .li-pre-line{
    margin-top: 9px;
  }

  .Icons{
    margin-left: 5px;
  }
  .edit{
      color: #278cc5;
    }
  .remove{
    color: red;
  }

  .form-editing{
    white-space: nowrap;
    *{
      float: left;
    }
  }

  span {
    font-weight: bold;
  }

  p {
    text-align: justify;
    padding: 0 1rem 0 0.5rem;
  }

  .ant-input {
    background-color: #fff;
  }

  .ant-input-number {
    background-color: #fff;
    width: 100%;
  }

  .ant-form-item-label > label {
    color: var(--text-color-secondary);
  }

  .input-teachers-group {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 3fr 2fr 1fr 0.1fr;
    grid-column-gap: 1rem;

    svg {
      color: var(--background-button-danger-color);
      cursor: pointer;
      align-self: center;
    }
  }

  .inputs-activities{
    button{
      position: absolute;
      float: right;
      margin-left: 2px;
    }
  }

  .input-disciplines-group {
    margin-top: 1rem;

    .first-line-group {
      svg {
        color: var(--background-button-danger-color);
        cursor: pointer;
        align-self: center;
      }

      display: grid;
      grid-template-columns: 2fr 1fr 0.07fr;
      grid-column-gap: 1rem;
    }

    .second-line-group {
      display: grid;
      grid-template-columns: 1fr 3fr 0.1fr;
      grid-column-gap: 1rem;
    }
  }
`;
