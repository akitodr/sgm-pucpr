import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  box-shadow: 0px 1px 8px #aaa;
  border-radius: 6px;
  padding: 2rem;

  .ant-input-number-input {
    background-color: #fff;
  }

  .ant-input-number{
    width: 100%;
  }

  .ant-input {
    background-color: #fff;
  }

  .ant-form-item-label > label {
    color: var(--text-color-secondary);
  }

  .table-row-red {
    background-color: rgba(232, 85, 69, 0.5);
  }

  .first-line {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 1rem;
  }
  
  .second-line {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .third-line {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .fourth-line {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-column-gap: 1rem;
  }

  .fifth-line {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .sixth-line {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 1rem;
  }

  .buttons-field {
    display: flex;
    justify-content: flex-end;

    button:nth-child(2) {
      background: var(--button-primary-color);
      border-color: var(--button-primary-color);
    }

    button {
      margin-left: 0.5rem;
    }
  }

  .title {
    display: flex;
    align-items: center;

    svg {
      color: var(--primary-color);
      cursor: pointer;
    }
  }
`;

export const TableItem = styled.div`
  margin-top: 2rem;
  background: #fff;

  svg {
    color: var(--primary-color);
    cursor: pointer;
  }

  
`;
