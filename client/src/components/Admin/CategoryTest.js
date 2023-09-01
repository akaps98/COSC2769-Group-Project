import React, { useState, useEffect } from "react";
import Axios from 'axios';

export default function CategoryTestData() {
    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        Axios.get('http://localhost:3001/admin/allCategories')
            .then((response) => {
                setCategories(response.data)
            })
            .catch(() => {alert('ProductUpdate.js_getCategories: error')});
    }
    useEffect(() => {
        getCategories()
    }, []);

    const [selectedID, setSelectedID] = useState({
        top: null,
        second: null,
        third: null,
    });
    const handleCategoryClick = (category, level) => {
        setSelectedID(prevSelected => ({
            top: 
                (level === 'top') 
                    ? ((selectedID.top === category.CategoryID) ? null : category.CategoryID) 
                    : (selectedID.top === category.CategoryID) 
                        ? null 
                        : selectedID.top,
            second: 
                (level === 'top')
                    ? null
                    : (level === 'second') 
                        ? ((selectedID.second === category.CategoryID) ? null : category.CategoryID) 
                        : selectedID.second,
            third: 
                (level === 'top' || level === 'second')
                    ? null
                    : (level === 'third') 
                        ? ((prevSelected.third === category.CategoryID) ? null : category.CategoryID) 
                        : selectedID.third,
        }));
    };

    return (
        <>
            <div>
                <h3>Category Management</h3>
                <p>( CRUD product categories. Delete&Update possible only if no products are related )</p>
                
                <div className="mx-auto col-5">
                    {categories.filter(category => !category.parentID).map((topCategory) => (
                        <div key={topCategory.CategoryID}>
                            <div className="p-3 mt-1 bg-dark text-white" onClick={() => handleCategoryClick(topCategory, 'top')}>
                                {topCategory.name} <span style={{color: "orange"}}>( {topCategory.count} )</span>
                            </div>

                            {selectedID.top === topCategory.CategoryID && (
                                <div>
                                    {categories.filter(category => category.parentID === topCategory.CategoryID).map((secondCategory) => (
                                        <div key={secondCategory.CategoryID}>
                                            <div className="mx-auto col-10 mt-1 p-3 bg-secondary text-white" onClick={() => handleCategoryClick(secondCategory, 'second')}>
                                                {secondCategory.name} <span style={{color: "orange"}}>( {secondCategory.count} )</span>
                                            </div>

                                            {selectedID.second === secondCategory.CategoryID && (
                                                <div>
                                                    {categories.filter(category => category.parentID === secondCategory.CategoryID).map((thirdCategory) => (
                                                        <div key={thirdCategory.CategoryID}>
                                                            <div className="mx-auto col-8 mt-1 p-3 bg-light text-dark" onClick={() => handleCategoryClick(thirdCategory, 'third')}>
                                                                {thirdCategory.name} <span style={{color: "orange"}}>( {thirdCategory.count} )</span>
                                                            </div>

                                                            {selectedID.third === thirdCategory.CategoryID && (
                                                                <div>
                                                                    {categories.filter(category => category.parentID === thirdCategory.CategoryID).map((fourthCategory) => (
                                                                        <div className="mx-auto col-6 mt-1 p-3 bg-white text-black" key={fourthCategory.CategoryID}>
                                                                            {fourthCategory.name} <span style={{color: "orange"}}>( {fourthCategory.count} )</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
