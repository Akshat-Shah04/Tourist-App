import React, { useEffect, useState } from 'react'
import SideBarDashboard from './Common/SideBarDashboard'
import axios from 'axios';
import { toast } from 'react-toastify';

const UserStatus = () => {
    const [user, setUser] = useState([]);
    const fetchData = async () => {
        const res = await axios.get("http://localhost:3000/users")
        setUser(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleStatus = async (id) => {
        const res = await axios.get(`http://localhost:3000/users/${id}`)
        const currStatus = res.data.status;
        try {
            if (currStatus === "block") {
                const res = await axios.patch(`http://localhost:3000/users/${id}`, { 'status': "unblock" })
                if (res.status === 200) {
                    toast.success(res.data.user, " unblocked successfully")
                    fetchData()
                }
            }
            else if (currStatus === "unblock") {
                const res = await axios.patch(`http://localhost:3000/users/${id}`, { 'status': "block" })
                if (res.status === 200) {
                    toast.warn(res.data.user, " Blocked Successfully")
                    fetchData()
                }
            }
            
        }
        catch (error) {
            console.log("Error Caught => ", error)
        }
    }

    return (
        <div>
            <SideBarDashboard />
            <div className="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user && user.map((data) => (
                                <tr>
                                    <th scope="row">{ }</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <button type="button" onClick={() => { handleStatus(data.id) }} class="btn btn-outline-danger">{data.status}</button>
                                    </td>
                                </tr>

                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserStatus
