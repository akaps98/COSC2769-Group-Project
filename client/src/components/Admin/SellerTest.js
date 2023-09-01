import React, { useState, useEffect } from "react";
import Axios from 'axios';

export default function SellerTest() {
    Axios.defaults.withCredentials = true;

    const [sellers, setSellers] = useState([]);
    const getSellers = () => {
        Axios.get('http://localhost:3001/allSellers')
            .then((response) => {
                setSellers(response.data);
            })
            .catch(() => {console.log('error')});
    }
    useEffect(() => {
        getSellers()
    }, []);

    function handleClick(e) {
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
                    console.log("SellerTest.js err:",err)
                }
            });
        }
    }

    return(
        <>
            <div className="m-5">
                <h3>Seller Management</h3>
                <p>( View and update seller's status )</p>
                <table className="table table-bordered table-striped table-dark">
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
                        {sellers.map((seller)=> 
                            <tr key={seller.SellerID}>
                                <td className="col-sm-1">{seller.SellerID}</td>
                                <td className="col-sm-2">{seller.username}</td>
                                <td className="col-sm-2">{seller.email}</td>
                                <td className="col-sm-2">{seller.phone}</td>
                                <td className="col-sm-2">{seller.business}</td>
                                <td className="col-sm-1">{seller.status}</td>
                                <td className="col-sm-2">
                                    {seller.status === "Pending" &&
                                        <div>
                                            <button className="btn btn-info" id={seller.SellerID} name="Approved" onClick={handleClick}>
                                                Approve
                                            </button>
                                            <button className="btn btn-warning" id={seller.SellerID} name="Rejected" onClick={handleClick}>
                                                Reject
                                            </button>
                                        </div>
                                    }
                                    {seller.status === "Approved" &&
                                        <div>
                                            <button className="btn btn-warning" id={seller.SellerID} name="Rejected" onClick={handleClick}>
                                                Reject
                                            </button>
                                        </div>
                                    }
                                    {seller.status === "Rejected" &&
                                        <div>
                                            <button className="btn btn-info" id={seller.SellerID} name="Approved" onClick={handleClick}>
                                                Approve
                                            </button>
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