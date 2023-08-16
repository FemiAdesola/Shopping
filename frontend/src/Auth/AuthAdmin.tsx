import React from 'react';
import { adminAuth } from '../HOC';

const AuthAdmin = () => {
    return (
      <div>
       
        This page can only be accessed ADMIN
   
      </div>
    );
};

export default adminAuth(AuthAdmin);