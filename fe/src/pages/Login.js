import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseurl';
import axios from 'axios';

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const login = async () => {
        if (!user.email || !user.password) {
            return alert("Please fill everything");
        }
        try {
            const { data } = await axios.post(`${baseUrl}/api/login`, user);
            if (data.success) {
                localStorage.setItem('token', data.data);
                return navigate('/');
            } else {
                return alert("Some error occured")
            }
        } catch (error) {
            console.log("Error", error);
            return alert("Some error occured")
        }
    }

    return (
        <div className="flex flex-col w-full justify-center items-center h-screen">
            <div className="flex flex-col border rounded-xl gap-4 p-12">
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <div className='flex flex-col gap-4'>
                    <input type="text" placeholder='Email' className='border-b-2 border-black'
                        onChange={(e) => {
                            setUser({
                                ...user,
                                email: e.target.value
                            })
                        }}
                    />
                    <input type="password" placeholder='Password' className='border-b-2 border-black'
                        onChange={(e) => {
                            setUser({
                                ...user,
                                password: e.target.value
                            })
                        }}
                    />
                    <button className='border' onClick={login}>Login</button>

                    <div>Don't have an account ? <a href="/signup" className='text-blue-500 '>Sign Up</a></div>
                </div>
            </div>
        </div>
    )
}

export default Login