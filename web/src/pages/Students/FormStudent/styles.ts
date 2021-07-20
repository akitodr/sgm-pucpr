import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 1.2rem 2rem;
  border-radius: 6px;
  box-shadow: 0px 1px 8px #aaa;

  h2 {
    margin-bottom: 1.5rem;
  }

  .ant-input {
    background-color: #fff;
  }

  .ant-form-item-label > label {
    color: var(--text-color-secondary);
  }

  .user-name {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-column-gap: 1rem;
  }

  .user-information {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .user-email {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .user-school-course {
    display: grid;
    grid-template-columns: 4fr 5fr;
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
`;
