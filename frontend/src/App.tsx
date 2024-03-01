import React, {useMemo} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Routes from '@src/Routes';
import Layout from '@components/templates/Layout';
import {ThemeConfig} from 'antd/es/config-provider/context';
import ThemeProvider, { themeMode } from '@src/themes';

export const configTheme: ThemeConfig = {
  components: {
    Table: {
      headerBg: '#cccccc',
      headerBorderRadius: 0,
      borderColor: '#ffffff'
    },
  },
};

function App() {
  const themeObject = useMemo(() => themeMode(), []);
  return (
    <ThemeProvider themeObject={themeObject}>
      <ConfigProvider theme={configTheme}>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
