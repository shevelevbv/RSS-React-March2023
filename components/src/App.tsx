import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './styles/App.scss';

class App extends React.Component {
  render = (): JSX.Element => {
    return (
      <>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={'about'} element={<About />} />
            <Route path={'*'} element={<NotFound />} />
          </Route>
        </Routes>
      </>
    );
  }
}

export default App;
