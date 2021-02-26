import React from 'react';
import { Route, Redirect } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ headerComponent: Header, mainComponent: Main, children, ...props  }) => {
  return (
    <Route path={props.path}>
      {
        () => props.loggedIn ?
          <>
            <Header {...props} />
            <Main children={children} />
          </>
          :
          <Redirect to="/" />
      }
    </Route>
)}

export default ProtectedRoute; 
