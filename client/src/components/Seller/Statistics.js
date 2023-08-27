import React from "react";

function Statistics(){
    return(
        <div className="statistics-container">
                <p className='statistics-title'>Sale Statistics</p>
                <div className="hr-line mb-4"/>
                <div className='statistics-main-container'>
                    <div className="col-sm-2">
                        <p className='status new'>202</p>
                        <p>New</p>
                    </div>
                    <div className="col-sm-2">
                        <p className='status'>1300</p>
                        <p>Shipped</p>
                    </div>
                    <div className="col-sm-2">
                        <p className='status'>13</p>
                        <p>Canceled</p>
                    </div>
                    <div className="col-sm-2">
                        <p className='status accepted'>13</p>
                        <p>Accepted</p>
                    </div>
                    <div className="col-sm-2">
                        <p className='status rejected'>13</p>
                        <p>Rejected</p>
                    </div>
                </div>
            </div>
    )
}

export default Statistics;