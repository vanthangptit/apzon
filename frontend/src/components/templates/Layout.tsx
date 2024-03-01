import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutBox>
      {/*<header>header</header>*/}
      {/*<nav>nav</nav>*/}
      <main>
        {children}
      </main>
      {/*<footer>footer</footer>*/}
      <ToastContainer
        position='bottom-right'
        autoClose={1500}
      />
    </LayoutBox>
  );
};

export default Layout;

export const LayoutBox = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg1};
`;
