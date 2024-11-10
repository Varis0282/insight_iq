import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../baseurl';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [user, setUser] = useState({
    name: "",
    email: ""
  })

  const navigate = useNavigate();

  const me = async () => {

    const headers = {
      'authorisation': `Bearer ${localStorage.getItem('token')}`
    }

    try {
      const { data } = await axios.get(`${baseUrl}/api/me`, {
        headers: headers
      });
      if (data.success) {
        const userData = data.data
        setUser({ ...userData })
      } else {
        return alert("Some error occured")
      }
    } catch (error) {
      console.log("Error", error);
      return alert("Some error occured")
    }
  }


  useEffect(() => {
    me();
  }, []);


  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <div className='flex w-full justify-evenly py-12'>

      <div>Hello {user?.name}</div>
      <button className='border bg-gray-300 rounded px-4 py-1' onClick={logout}>Logout</button>
    </div>
  )
}

export default Home