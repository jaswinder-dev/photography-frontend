import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE } from '../config/env';
import "./App.css";  //common style for all the pages.
import "./Style.css";  //style for 'frontend'
import "./Admin/Style.css";  //style for 'backend'

import Home from './components/layout/Home';
import Login from './Admin/pages/Login';

import AllPosts from './Admin/pages/AllPosts';
import AddPost from './Admin/pages/AddPost';
import UpdatePost from './Admin/pages/UpdatePost';
import UpdatePostDes from './Admin/pages/UpdatePostDes';
import DeletePost from './Admin/pages/DeletePost';

import AllPhotographers from './Admin/pages/AllPhotographers';
import AddPhotographer from './Admin/pages/AddPhotographer';
import UpdatePhotographer from './Admin/pages/UpdatePhotographer';
import DeletePhotographer from './Admin/pages/DeletePhotographer';

import AllPortfolioes from './Admin/pages/AllPortfolioes';
import AddPortfolio from './Admin/pages/AddPortfolio';
import UpdatePortfolio from './Admin/pages/UpdatePortfolio';
import DeletePortfolio from './Admin/pages/DeletePortfolio';

import AllTestimonies from './Admin/pages/AllTestimonies';
import AddTestimony from './Admin/pages/AddTestimony';
import UpdateTestimony from './Admin/pages/UpdateTestimony';
import DeleteTestimony from './Admin/pages/DeleteTestimony';

import AllServices from './Admin/pages/AllServices';
import AddService from './Admin/pages/AddService';
import UpdateService from './Admin/pages/UpdateService';
import DeleteService from './Admin/pages/DeleteService';

import Profile from './Admin/pages/Profile';
import ImageGallery from './components/pages/ImageGallery';
import Blog from './components/pages/Blog';
import AddBlog from './Admin/pages/AddBlog';
import MyImages from './Admin/pages/MyImages';
import Dashboard from './Admin/pages/Dashboard';
import UpdateLogo from './Admin/pages/editFrontEnd/UpdateLogo';
import UpdateBanner from './Admin/pages/editFrontEnd/UpdateBanner'
import PortfolioPage from './components/pages/PortfolioPage';

import Error from './Admin/pages/Error';
import AllBlogs from './Admin/pages/AllBlogs';
import UpdateBlog from './Admin/pages/UpdateBlog';
import DeleteBlog from './Admin/pages/DeleteBlog';
import UpdateBlogImg from './Admin/pages/UpdateBlogImg';
import UpdateSocials from './Admin/pages/editFrontEnd/UpdateSocials';
import PrivateComponent from './Admin/components/PrivateComponent';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<PrivateComponent />}>
          <Route path={`/admin/${ROUTE}/photographers`} element={<AllPhotographers />} />
          <Route path={`/admin/${ROUTE}/photographer/add`} element={<AddPhotographer />} />
          <Route path={`/admin/${ROUTE}/photographer/update/:id`} element={<UpdatePhotographer />} />
          <Route path={`/admin/${ROUTE}/delete/photographer/:id/:prevURL`} element={<DeletePhotographer />} />
          <Route path={`/admin/${ROUTE}/portfolioes`} element={<AllPortfolioes />} />
          <Route path={`/admin/${ROUTE}/portfolio/add`} element={<AddPortfolio />} />
          <Route path={`/admin/${ROUTE}/portfolio/update/:id`} element={<UpdatePortfolio />} />
          <Route path={`/admin/${ROUTE}/portfolio/delete/:id/:prevURL`} element={<DeletePortfolio />}></Route>
          <Route path={`/admin/${ROUTE}/services`} element={<AllServices />}></Route>
          <Route path={`/admin/${ROUTE}/add/services`} element={<AddService />}></Route>
          <Route path={`/admin/${ROUTE}/update/service/:id`} element={<UpdateService />}></Route>
          <Route path={`/admin/${ROUTE}/delete/service/:id/:prevURL`} element={<DeleteService />}></Route>
          <Route path={`/admin/${ROUTE}/blogs`} element={<AllBlogs />}></Route>
          <Route path={`/admin/${ROUTE}/add/blog`} element={<AddBlog />}></Route>
          <Route path={`/admin/${ROUTE}/update/blog/:id`} element={<UpdateBlog />}></Route>
          <Route path={`/admin/${ROUTE}/update/blog/image/:id`} element={<UpdateBlogImg />}></Route>
          <Route path={`/admin/${ROUTE}/delete/blog/:id/:prevURL`} element={<DeleteBlog />}></Route>
          <Route path={`/admin/${ROUTE}`} element={<Dashboard />} />
          <Route path={`/admin/${ROUTE}/update/logo`} element={<UpdateLogo />}></Route>
          <Route path={`/admin/${ROUTE}/update/banner`} element={<UpdateBanner />}></Route>
          <Route path={`/admin/${ROUTE}/socials/update`} element={<UpdateSocials />}></Route>
        </Route>
        <Route path='/' element={<Home />} />
        <Route path={`/admin/${ROUTE}/login`} element={<Login />} />
        <Route path={`/admin/${ROUTE}/myimages/:id`} element={<MyImages />} />
        <Route path={`/admin/${ROUTE}/profile/:id`} element={<Profile />} />
        <Route path={`/admin/${ROUTE}/posts`} element={<AllPosts />} />
        <Route path={`/admin/${ROUTE}/post/add`} element={<AddPost />} />
        <Route path={`/admin/${ROUTE}/post/update/:id`} element={<UpdatePost />} />
        <Route path={`/admin/${ROUTE}/post/update/description/:id`} element={<UpdatePostDes />} />
        <Route path={`/admin/${ROUTE}/post/delete/:id/:prevURL`} element={<DeletePost />} />
        <Route path={`/admin/${ROUTE}/testimonies`} element={<AllTestimonies />}></Route>
        <Route path={`/admin/${ROUTE}/add/testimony`} element={<AddTestimony />}></Route>
        <Route path={`/admin/${ROUTE}/update/testimony/:id`} element={<UpdateTestimony />}></Route>
        <Route path={`/admin/${ROUTE}/delete/testimony/:id/:prevURL`} element={<DeleteTestimony />}></Route>
        <Route path='/portfolio/:title/:id' element={<PortfolioPage />}></Route>
        <Route path='/images' element={<ImageGallery />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;