/** @format */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ActivityIndicator, Sidebar } from './components';
import { ROUTES } from './lib';
import { useUserState } from './context';
import MainPage from './pages/MainPage';
import {
  Banners,
  Login,
  // Login,
  Overview,
} from './pages';
import { DesktopNav } from './components/DesktopNav';
import { Header } from './components/Header/Header';
import { Partners } from './pages/modules/Partners/Partners';
import { Customers } from './pages/modules/Customers/Customers';
import { Posts } from './pages/modules/Post';
import { OfficeInformation } from './pages/modules/OfficeInformation/OfficeInformation';
import { RealEstateTypeManagement } from './pages/modules/RealEstateTypeManagement/RealEstateTypeManagement';

function App(props: any) {
  const { isAuth } = useUserState();
  return (
    <Router basename='/'>
      {isAuth ? <Header /> : null}
      <React.Suspense fallback={ActivityIndicator()}>
        {isAuth ? (
          <div className='lg:pt-20 pt-16 overflow-hidden'>
            <div className='w-screen h-fit flex flex-col lg:flex-row '>
              <div className='px-5 flex-[0.25] shadow-md'>
                <div className='pl-5 h-full pr-10 hidden lg:w-full lg:block'>
                  <DesktopNav />
                </div>
                <div className='lg:hidden w-full'>
                  <Sidebar />
                </div>
              </div>
              <div className='px-5 flex-[0.75] h-fit'>
                <Routes>
                  {!isAuth ? <Route path={`${ROUTES.APP.LOGIN}`} element={<Login />} /> : null}
                  {isAuth ? (
                    <>
                      <Route path={ROUTES.APP.BANNERS.BANNERS_HOME} element={<Banners />} />
                      <Route path={ROUTES.APP.CUSTOMERS.CUSTOMERS_HOME} element={<Customers />} />
                      <Route path={ROUTES.APP.PARTNERS.PARTNERS_HOME} element={<Partners />} />
                      <Route path={ROUTES.APP.POSTS.POST_HOME} element={<Posts />} />
                      <Route
                        path={ROUTES.APP.OFFICEINFORMATION.OFFICEINFORMATION_HOME}
                        element={<OfficeInformation />}
                      />
                      <Route path={`real-estate-type`} element={<RealEstateTypeManagement />} />
                      <Route path={`/charts`} element={<Overview />} />
                      <Route path={`*`} element={<MainPage {...props} />} />
                    </>
                  ) : (
                    <Route path={`*`} element={<Navigate replace to={`${ROUTES.APP.LOGIN}`} />} />
                  )}
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-full '>
            <Routes>
              <Route path={`${ROUTES.APP.LOGIN}`} element={<Login />} />
            </Routes>
          </div>
        )}
      </React.Suspense>
    </Router>
  );
}

export default App;
