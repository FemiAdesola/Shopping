import React from 'react';
import { userAuth } from '../HOC';

const AuthTest = () => {
    return <div>This page can be accessed by any logged in user</div>;
};

export default userAuth(AuthTest);