import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Main from './components/pages/Main';
import { NavComponent } from './components/blocks/nav';
import Analytics from './components/pages/Analytics';
import Loading from './components/pages/Loading';

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <NavComponent/>
          <Routes>
              <Route path="/" element={<Main />}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<LogIn/>}/>
              <Route path="/analytics" element={<Analytics />}/>
              <Route path="/*" element={<Loading />} />
          </Routes>
      </BrowserRouter>

  );
};

export default App;
