import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ScenesProvider } from '../../Context';

import Layout from '../../Components/Layout'

import Scenes from '../Scenes'
import Breakdown from '../Breakdown'
import Locations from '../Locations'
import Characters from '../Characters'
import NotFound from '../NotFound'

import './App.css'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Scenes /> },
    { path: '/breakdown/:sceneId', element: <Breakdown /> },
    { path: '/locations', element: <Locations /> },
    { path: '/characters', element: <Characters /> },
    { path: '/*', element: <NotFound /> },
  ]);
  return routes;
}

const App = () => {
  return (
    <ScenesProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ScenesProvider>
  )
}

export default App
