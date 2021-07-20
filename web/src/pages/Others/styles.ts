import styled from 'styled-components';

export const CollapseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  svg {
    margin-left: 0.5rem;
    color: var(--primary-color);
  }
`;

export const Container = styled.div`
  svg {
    cursor: pointer;
  }
`;