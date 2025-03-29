import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const withAuth = (WrappedComponent) => {
    const AuthComponents = (props) =>{
        const router = useNavigate();

        const isAuthenticated = () => {
            console.log(localStorage.getItem('token'))
            if(localStorage.getItem('token')) {
                return true;
            }
            return false;
        }
        useEffect(() => {
            if(!isAuthenticated()) {
                router('/auth')
            }
        }, [])
        return <WrappedComponent {...props} />
    }
    return AuthComponents;
}

export  {withAuth};