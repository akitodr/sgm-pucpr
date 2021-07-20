import styled from 'styled-components';

export const TableItem = styled.div`
  margin-top: 2rem;
  background: #fff;
  box-shadow: 0px 1px 8px #aaa;
  border-radius: 6px;

  svg {
    color: var(--primary-color);
    cursor: pointer;
  }

  .table-row-red {
    background-color: rgba(232, 85, 69, 0.5);
  }
`;

export const ModalContent = styled.div`
  .drop-files-field {
    display: grid;
    grid-template-columns: 1fr 1fr;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 3rem;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      width: 100%;
      padding: 0 1rem;

      .file-info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        max-width: 70%;
        min-width: 70%;

        svg {
          color: #1d6f42;
          margin-right: 1rem;
          min-width: 1.5rem;
          min-height: 1.5rem;
          cursor: auto;
        }

        .file-size-text {
          display: block;
          font-size: 0.7rem;
          color: #bbb;
        }
      }

      .red {
        color: #e85545;
        cursor: pointer;
      }

      .green {
        color: #32cd32;
      }

      h4 {
        font-size: 1rem;
      }

      .file-list {
        max-height: 100%;
        ul {
          max-height: 14rem;
          overflow-y: scroll;
        }
      }
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .ant-input-suffix svg {
    color: var(--primary-color);
  }

  .buttons Button {
    margin-left: 0.2rem;
  }

  .newButton {
    background: var(--primary-color);
    border-color: var(--primary-color);
  }

  .uploadButton {
    background: var(--button-primary-color);
    border-color: var(--button-primary-color);
  }
`;
