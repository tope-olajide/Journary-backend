import React, {
  useEffect
} from "react";
import jsonwebtoken from 'jsonwebtoken';
import {
  connect
} from 'react-redux';
import {
  signOut
} from '../actions/authActions'

export default (ProtectedRoute) => {
  const AuthenticateUser = (props) => {
    useEffect(() => {
      const JWT_SECRET = process.env.JWT_SECRET || 'config.jwtSecret';
      const token = localStorage.getItem('token');
      if (!token) {
        props.signOut();
      } else if (token) {
        jsonwebtoken.verify(token, JWT_SECRET, (error, decoded) => {
          if (error || decoded.exp < (new Date().getTime() / 1000)) {
            props.signOut();
          }
        });
      }
    })
    return ( <
      ProtectedRoute {
        ...props
      }
      />
    );
  }
  return connect(null, {
    signOut
  })(AuthenticateUser);
}