import React, { useState } from 'react'
import { baseUrl } from '../baseurl'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const signup = async () => {
        if (!user.name || !user.email || !user.password) {
            return alert("Please fill everything");
        }
        try {
            const { data } = await axios.post(`${baseUrl}/api/signup`, user);
            if (data.success) {
                return navigate('/login');
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
                <h1 className='text-3xl font-bold text-center'>Signup</h1>
                <div className='flex flex-col gap-4'>
                    <input type="text" placeholder='Name' className='border-b-2 border-black'
                        onChange={(e) => {
                            setUser({
                                ...user,
                                name: e.target.value
                            })
                        }}
                    />
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
                    <button className='border' onClick={signup}>Sign Up</button>
                    <div>Already have an account ? <a href="/login" className='text-blue-500 '>Login</a></div>
                </div>
            </div>
        </div>
    )
}

export default Signup