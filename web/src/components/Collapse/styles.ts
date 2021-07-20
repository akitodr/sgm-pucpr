import styled from 'styled-components';

export const Container = styled.div`
  /* background: rgba(255, 0, 0, 0.3); */
  border-radius: 8px;
	margin-bottom: 0.5rem;
	background: #fff;
	box-shadow: 0px 1px 8px #aaa;

  .expanded {
    border-radius: 8px 8px 0 0;
    border-bottom: 0;
  }

  .rotate {
    transform: rotate(90deg);
	}
	
	.ant-list-item {
		border-bottom: 1px solid #ddd;
	}
`;

export const Header = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
	align-items: center;
	width: 100%;

  border: 1px solid #ddd;
  svg {
		color: #aaa;
    transition: 0.2s;
  }
`;

export const Content = styled.div`
  padding: 0.5rem;
  /* background: #fff; */
  border-radius: 0 0 8px 8px;

  border: 1px solid #ddd;
`;
