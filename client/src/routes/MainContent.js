import React from 'react';
import {Routes,Route} from 'react-router-dom';
import { Homepage,ProductPage } from '../pages';

const MainContent = () => {
  return (
    <>
    <Routes>
        <Route path='' element={
            <Homepage></Homepage>
        }>
        </Route>
        <Route path='Product' element={
            <ProductPage></ProductPage>
        }></Route>
    </Routes>
    </>
  )
}

export default MainContent