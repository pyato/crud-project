import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import UserTable from './components/UserTable';
import { UserContext } from './components/UserContext';

function App() {
  const userContext = useContext(UserContext);

  return (
    <div>
      <h3>CRUD Application</h3>
      <div className="container">
        <div className="left-side">
          {userContext.formUser()}
        </div>
        <div className="right-side">
          <UserTable />
        </div>
      </div>
    </div>

  );
}

export default App;
