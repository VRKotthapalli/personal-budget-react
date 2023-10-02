import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {
  return (
    // <Router>
    //     <Menu/>
    //     <Hero/>
    //     <div className='mainContainer'>
    //       <Switch>
    //         <Route path="/about">
    //           <AboutPage/>
    //         </Route>
    //         <Route path="/login">
    //           <LoginPage/>
    //         </Route>
    //         <Route path="/">
    //           <Homepage/>
    //         </Route>
    //       </Switch>
    //     </div>
    //   <Footer/>
    //  </Router>
    
    <Router>
      <div className="mainContainer">
        <Menu/>
        <Hero/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
