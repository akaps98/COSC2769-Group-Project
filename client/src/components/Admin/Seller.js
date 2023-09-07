import React, { useState, useEffect } from "react";
import Axios from 'axios';

export default function Seller() {
    Axios.defaults.withCredentials = true;

    const [sellers, setSellers] = useState([]);
    const getSellers = () => {
        Axios.get('http://localhost:3001/allSellers')
            .then((response) => {
                setSellers(response.data);
            })
            .catch(() => { console.log('error') });
    }
    useEffect(() => {
        getSellers()
    }, []);

    function handleUpdate(e) {
        const { name } = e.target;
        const i = parseInt(e.currentTarget.getAttribute("id"));
        if (window.confirm("Are you sure to update the status of seller "+i+" to "+name+"?")) {
            Axios.post('http://localhost:3001/admin/updateSellerStatus', {
                SellerID: i,
                newStatus: name
            }).then((response) => {
                if (response.data.message) {
                    alert(JSON.stringify(response.data.message));
                    getSellers();
                } else {
                    console.log("SellerTest.js err:")
                }
            });
        }
    }

    return (
        <>
            <div className="seller-table-container">
                <h3>Seller Management</h3>
                <div className="hr-line my-4" />
                <table className="management-table">
                    <thead>
                        <tr>
                            <th className="col-sm-1">Seller ID</th>
                            <th className="col-sm-2">Username</th>
                            <th className="col-sm-2">Email</th>
                            <th className="col-sm-2">Phone</th>
                            <th className="col-sm-2">Business Name</th>
                            <th className="col-sm-1">Status</th>
                            <th className="col-sm-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) =>
                            <tr key={seller.SellerID}>
                                <td className="col-sm-1">{seller.SellerID}</td>
                                <td className="col-sm-2">{seller.username}</td>
                                <td className="col-sm-2">{seller.email}</td>
                                <td className="col-sm-2">{seller.phone}</td>
                                <td className="col-sm-2">{seller.business}</td>
                                <td className="col-sm-1 pe-2 text-center">
                                    <p className={seller.status + " seller-status Rejected"}>{seller.status}</p>
                                </td>
                                <td className="col-sm-2">
                                    {seller.status === "Pending" &&
                                        <div>
                                            <button className="btn-success approve-btn me-1" id={seller.SellerID} name="Approved" onClick={handleUpdate}>Approve</button>
                                            <button className="btn-danger reject-btn" id={seller.SellerID} name="Rejected" onClick={handleUpdate}>Reject</button>
                                        </div>
                                    }
                                    {seller.status === "Approved" &&
                                        <div>
                                            <button className="btn-danger reject-btn" id={seller.SellerID} name="Rejected" onClick={handleUpdate}>Reject</button>
                                        </div>
                                    }
                                    {seller.status === "Rejected" &&
                                        <div>
                                            <button className="btn-success approve-btn" id={seller.SellerID} name="Approved" onClick={handleUpdate}>Approve</button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}