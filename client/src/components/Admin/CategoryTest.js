import React, { useState, useEffect } from "react";
import Axios from 'axios';
import CategoryDelete from "./CategoryDelete";
import AddCategory from "./AddCategory";
import AddSubcategory from "./AddSubcategory";

export default function CategoryTestData() {
    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        Axios.get('http://localhost:3001/admin/allCategories')
            .then((response) => {
                setCategories(response.data)
            })
            .catch(() => { alert('ProductUpdate.js_getCategories: error') });
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

    const checkSubCategory = (parent) => {
        for (let category of categories) {
            if (category.parentID === parent) {
                return true;
            }
        }
        return false;
    }

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const handleDeleteModalClose = () => setDeleteModalShow(false);
    const handleDeleteModalShow = () => setDeleteModalShow(true);

    const [addModalShow, setAddModalShow] = useState(false);
    const handleAddModalClose = () => setAddModalShow(false);
    const handleAddModalShow = () => setAddModalShow(true);

    const [addSubcategoryModalShow, setAddSubcategoryModalShow] = useState(false);
    const handleAddSubcategoryModalClose = () => setAddSubcategoryModalShow(false);
    const handleAddSubcategoryModalShow = () => setAddSubcategoryModalShow(true);

    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <>
            <CategoryDelete deleteModalshow={deleteModalShow} handleDeleteModalClose={handleDeleteModalClose} />
            <AddCategory addModalshow={addModalShow} handleAddModalClose={handleAddModalClose} />
            <AddSubcategory addSubcategoryModalshow={addSubcategoryModalShow} handleAddSubcategoryModalClose={handleAddSubcategoryModalClose} />
            <div className="my-5 category-list-container">
                <div className="category-list-header">
                    <div>
                        <h3>Category Management</h3>
                        <p>( CRUD product categories. Delete is possible only when there are no products in the category )</p>
                    </div>
                    <button className="add-btn" onClick={handleAddModalShow}>Add Category</button>
                </div>
                <div className="hr-line my-4" />
                <div className="category-container">
                    <div>
                        {categories.filter(category => !category.parentID).map((topCategory) => (
                            <div key={topCategory.CategoryID}>
                                <div className="topCategory-container">
                                    <div
                                        className={checkSubCategory(topCategory.CategoryID)
                                            ? "subcategory-btn"
                                            :
                                            "subcategory-btn disable-click"
                                        }>
                                        {checkSubCategory(topCategory.CategoryID) ?
                                            selectedID.top === topCategory.CategoryID ?
                                                <button className="category-active" onClick={() => { handleCategoryClick(topCategory, 'top') }}>-</button>
                                                :
                                                <button onClick={() => { handleCategoryClick(topCategory, 'top') }}>+</button>
                                            :
                                            ""
                                        }
                                    </div>
                                    {parseInt(selectedCategory) === topCategory.CategoryID ?
                                        <div className="category-name-container">
                                            <input defaultValue={topCategory.name} />
                                            <div className="category-manage-btn-container">
                                                <button className="text-success me-3 save-text" onClick={() => setSelectedCategory(null)}>Save</button>
                                                <button className="text-secondary cancel-text" onClick={() => setSelectedCategory(null)}>Cancel</button>
                                            </div>
                                        </div>
                                        :
                                        <div className="category-name-container">
                                            <p>{topCategory.name}</p>
                                            <div className="category-manage-btn-container">
                                                <button className="category-edit-btn" value={topCategory.CategoryID}
                                                    onClick={(e) => {
                                                        setSelectedCategory(e.target.value);
                                                    }}
                                                ></button>
                                                <button className="category-delete-btn" onClick={handleDeleteModalShow}></button>
                                                <button className="subcategory-add-btn" onClick={handleAddSubcategoryModalShow}></button>
                                            </div>
                                        </div>
                                    }
                                </div>

                                {selectedID.top === topCategory.CategoryID && (
                                    <div>
                                        {categories.filter(category => category.parentID === topCategory.CategoryID).map((secondCategory) => (
                                            <div key={secondCategory.CategoryID}>
                                                <div className="secondCategory-container">
                                                    <div
                                                        className={checkSubCategory(secondCategory.CategoryID)
                                                            ? "subcategory-btn"
                                                            :
                                                            "subcategory-btn disable-click"
                                                        }>
                                                        {checkSubCategory(secondCategory.CategoryID) ?
                                                            selectedID.second === secondCategory.CategoryID ?
                                                                <button className="category-active" onClick={() => { handleCategoryClick(secondCategory, 'second') }}>-</button>
                                                                :
                                                                <button onClick={() => { handleCategoryClick(secondCategory, 'second') }}>+</button>
                                                            :
                                                            ""
                                                        }
                                                    </div>
                                                    {parseInt(selectedCategory) === secondCategory.CategoryID ?
                                                        <div className="category-name-container">
                                                            <input defaultValue={secondCategory.name} />
                                                            <div className="category-manage-btn-container">
                                                                <button className="text-success me-3 save-text" onClick={() => setSelectedCategory(null)}>Save</button>
                                                                <button className="text-secondary cancel-text" onClick={() => setSelectedCategory(null)}>Cancel</button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="category-name-container">
                                                            <p>{secondCategory.name}</p>
                                                            <div className="category-manage-btn-container">
                                                                <button className="category-edit-btn" value={secondCategory.CategoryID}
                                                                    onClick={(e) => {
                                                                        setSelectedCategory(e.target.value);
                                                                    }}
                                                                ></button>
                                                                <button className="category-delete-btn" onClick={handleDeleteModalShow}></button>
                                                                <button className="subcategory-add-btn" onClick={handleAddSubcategoryModalShow}></button>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                {selectedID.second === secondCategory.CategoryID && (
                                                    <div>
                                                        {categories.filter(category => category.parentID === secondCategory.CategoryID).map((thirdCategory) => (
                                                            <div key={thirdCategory.CategoryID}>
                                                                <div className="thirdCategory-container">
                                                                    <div
                                                                        className={checkSubCategory(thirdCategory.CategoryID)
                                                                            ? "subcategory-btn"
                                                                            :
                                                                            "subcategory-btn disable-click"
                                                                        }>
                                                                        {checkSubCategory(thirdCategory.CategoryID) ?
                                                                            selectedID.third === thirdCategory.CategoryID ?
                                                                                <button className="category-active" onClick={() => { handleCategoryClick(thirdCategory, 'third') }}>-</button>
                                                                                :
                                                                                <button onClick={() => { handleCategoryClick(thirdCategory, 'third') }}>+</button>
                                                                            :
                                                                            ""
                                                                        }
                                                                    </div>
                                                                    {parseInt(selectedCategory) === thirdCategory.CategoryID ?
                                                                        <div className="category-name-container">
                                                                            <input className="mt-2" defaultValue={thirdCategory.name} />
                                                                            <div className="category-manage-btn-container">
                                                                                <button className="text-success me-3 save-text" onClick={() => setSelectedCategory(null)}>Save</button>
                                                                                <button className="text-secondary cancel-text" onClick={() => setSelectedCategory(null)}>Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div className="category-name-container">
                                                                            <p>{thirdCategory.name}</p>
                                                                            <div className="category-manage-btn-container">
                                                                                <button className="category-edit-btn" value={thirdCategory.CategoryID}
                                                                                    onClick={(e) => {
                                                                                        setSelectedCategory(e.target.value);
                                                                                    }}
                                                                                ></button>
                                                                                <button className="category-delete-btn" onClick={handleDeleteModalShow}></button>
                                                                                <button className="subcategory-add-btn" onClick={handleAddSubcategoryModalShow}></button>
                                                                            </div>
                                                                        </div>}
                                                                </div>

                                                                {selectedID.third === thirdCategory.CategoryID && (
                                                                    <div>
                                                                        {categories.filter(category => category.parentID === thirdCategory.CategoryID).map((fourthCategory) => (
                                                                            <div className="fourthCategory-container" key={fourthCategory.CategoryID}>
                                                                                {parseInt(selectedCategory) === fourthCategory.CategoryID ?
                                                                                    <div className="category-name-container">
                                                                                        <input className="mt-2" defaultValue={fourthCategory.name} />
                                                                                        <div className="category-manage-btn-container">
                                                                                            <button className="text-success me-3 save-text" onClick={() => setSelectedCategory(null)}>Save</button>
                                                                                            <button className="text-secondary cancel-text" onClick={() => setSelectedCategory(null)}>Cancel</button>
                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    <div className="category-name-container">
                                                                                        <p>{fourthCategory.name}</p>
                                                                                        <div className="category-manage-btn-container">
                                                                                            <button className="category-edit-btn" value={fourthCategory.CategoryID}
                                                                                                onClick={(e) => setSelectedCategory(e.target.value)}
                                                                                            ></button>
                                                                                            <button className="category-delete-btn" onClick={handleDeleteModalShow}></button>
                                                                                        </div>
                                                                                    </div>
                                                                                }
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
            </div>
        </>
    );
}