import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  
  left: 15rem;
  width: calc(100% - 15rem);
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
      display:block;
      max-height:100%;
      max-width:100%;
      margin-right: 1rem;
      margin-left: 1rem;
    }
    svg {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
`;

export const SideMenu = styled.div`
  width: 15rem;
  height: 100vh;
  background: var(--primary-color);
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: var(--text-color-light);
    font-size: 3rem;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--text-color-light);
    padding-bottom: .5rem;
  }
  img {
      margin-bottom: 2rem;
  }
  ul {
    list-style: none;
    /* background: red; */
    width: 100%;
    li a {
      padding: 1rem 2.2rem;
      display: flex;
      align-items: center;
      justify-content: left;
      text-decoration: none;
      transition: 0.4s;
      &:hover {
        background-color: rgba(237, 237, 237, 0.1);
      }
      svg {
        background-color: rgba(237, 237, 237, 0.3);
        padding: 6px;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 4px;
        margin-right: 1rem;
        color: #fff;
      }
      span {
        color: var(--text-color-light);
      }
    }
  }
`;

export const Container = styled.div`
  left: 15rem;
  top: 6rem;
  position: relative;
  width: calc(100% - 15rem);
  padding: 2rem;
`;