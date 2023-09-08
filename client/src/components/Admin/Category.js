import React, { useState, useEffect } from "react";
import Axios from 'axios';
import CategoryDelete from "./CategoryDelete";
import AddCategory from "./AddCategory";
import AddSubcategory from "./AddSubcategory";
import AddAttribute from "./AddAttribute";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        Axios.get('http://localhost:3001/admin/allCategories')
            .then((response) => {
                setCategories(response.data)
            })
            .catch(() => { console.log('ProductUpdate.js_getCategories: error') });
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

    const [addAttributeModalShow, setAddAttributeModalShow] = useState(false);
    const handleAddAttributeModalClose = () => setAddAttributeModalShow(false);
    const handleAddAttributeModalShow = () => setAddAttributeModalShow(true);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [newName, setNewName] = useState("");

    const handleUpdate = event => {
        event.preventDefault();
        const { id, name } = event.target;
        if (updatedAttributes !== "") {
            Axios.post('http://localhost:3001/admin/updateAttribute', {
                CategoryID: id,
                attributes: updatedAttributes.split(/\s*,\s*/)
            }).then((response) => {
                if (response.data.message) {
                    setUpdatedAttributes("");
                    handleUpdateCategory(id, name);
                } else {
                    alert(JSON.stringify(response.data));
                }
            });
        } else {
            handleUpdateCategory(id, name);
        }
    }
    const handleUpdateCategory = (id, name) => {
        Axios.post('http://localhost:3001/admin/updateCategory', {
            CategoryID: id,
            newName: newName,
            parentID: name,
        }).then((response) => {
            if (response.data.message) {
                alert("Category is updated successfully!");
                getCategories();
                setSelectedCategory(null);
                setNewName("");
            } else {
                alert(JSON.stringify(response.data));
            }
        });
    }
    function cancelUpdate() {
        setNewName("");
        setSelectedCategory(null);
    }

    const [categoryID,setCategoryID] = useState();
    function setDelete(id) {
        setCategoryID(id);
        handleDeleteModalShow();
    }
    function handleDelete() {
        Axios.post('http://localhost:3001/admin/deleteCategory', {
            CategoryID: categoryID
        }).then((response) => {
            if (response.data.message) {
                alert("Category is deleted successfully!");
                getCategories();
                handleDeleteModalClose();
            } else {
                console.log("CategoryTest.js delete error");
            }
        });
    }

    const [parentID,setParentID] = useState();
    function setCreate(id) {
        setParentID(id);
        if (id===null) {
            handleAddModalShow();
        } else {
            handleAddSubcategoryModalShow();
        }
    }
    function handleCreate() {
        Axios.post('http://localhost:3001/admin/createCategory', {
            parentID: parentID,
            newName: newName,
        }).then((response) => {
            if (response.data.message) {
                // Alert can be replaced with something else
                alert(JSON.stringify(response.data.message));
                //
                getCategories();
                handleAddModalClose();
                handleAddSubcategoryModalClose();
                setNewName("");
            } else {
                alert(JSON.stringify(response.data));
            }
        });
    }

    const [newAttribute, setNewAttribute] = useState("")
    function setCreateAttribute(id) {
        setCategoryID(id);
        handleAddAttributeModalShow();
    }
    function handleCreateAttribute() {
        Axios.post('http://localhost:3001/admin/addAttribute', {
            CategoryID: categoryID,
            newAttribute: newAttribute,
        }).then((response) => {
            if (response.data.message) {
                // Alert can be replaced with something else
                alert(JSON.stringify(response.data.message));
                //
                getCategories();
                handleAddAttributeModalClose();
                setNewAttribute("");
            } else {
                alert(JSON.stringify(response.data));
            }
        });
    }

    const [updatedAttributes, setUpdatedAttributes] = useState("")

    return (
        <>
            <CategoryDelete deleteModalshow={deleteModalShow} handleDeleteModalClose={handleDeleteModalClose} handleDelete={handleDelete}/>
            <AddCategory addModalshow={addModalShow} handleAddModalClose={handleAddModalClose} newName={newName} setNewName={setNewName} handleCreate={handleCreate}/>
            <AddSubcategory addSubcategoryModalshow={addSubcategoryModalShow} handleAddSubcategoryModalClose={handleAddSubcategoryModalClose} newName={newName} setNewName={setNewName} handleCreate={handleCreate}/>
            <AddAttribute addAttributeModalshow={addAttributeModalShow} handleAddAttributeModalClose={handleAddAttributeModalClose} newAttribute={newAttribute} setNewAttribute={setNewAttribute} handleCreateAttribute={handleCreateAttribute}/>
            <div className="my-5 category-list-container">
                <div className="category-list-header">
                    <div>
                        <h3>Category Management</h3>
                        <p>( Delete & Update shows only if no products are related)</p>
                    </div>
                    <button className="add-btn" onClick={() => setCreate(null)}>Add Category</button>
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
                                            <form id={topCategory.CategoryID} name={topCategory.parentID} onSubmit={handleUpdate}>
                                                <input placeholder={topCategory.name} value={newName} onChange={(e) => setNewName(e.target.value)} required/>
                                                <div className="category-manage-btn-container">
                                                    <button type="submit" className="text-success me-3 save-text">Save</button>
                                                    <button type="button" className="text-secondary cancel-text" onClick={cancelUpdate}>Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                        :
                                        <div className="category-name-container">
                                            <p>{topCategory.name} <span style={{color: "lightgray"}}>({topCategory.count} products)</span></p>
                                            <div className="category-manage-btn-container">
                                                {(topCategory.count===0) &&
                                                    <>
                                                        <button className="category-edit-btn" value={topCategory.CategoryID}
                                                            onClick={(e) => {
                                                                setSelectedCategory(e.target.value);
                                                            }}
                                                        ></button>
                                                        <button className="category-delete-btn" onClick={() => setDelete(topCategory.CategoryID)}></button>
                                                    </>
                                                }
                                                <button className="subcategory-add-btn" onClick={() => setCreate(topCategory.CategoryID)}></button>
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
                                                            <form id={secondCategory.CategoryID} name={secondCategory.parentID} onSubmit={handleUpdate}>
                                                                <input placeholder={secondCategory.name} value={newName} onChange={(e) => setNewName(e.target.value)} required/>
                                                                <div className="category-manage-btn-container">
                                                                    <button type="submit" className="text-success me-3 save-text">Save</button>
                                                                    <button type="button" className="text-secondary cancel-text" onClick={cancelUpdate}>Cancel</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        :
                                                        <div className="category-name-container">
                                                            <p>{secondCategory.name} <span style={{color: "lightgray"}}>({secondCategory.count} products)</span></p>
                                                            <div className="category-manage-btn-container">
                                                                {(secondCategory.count===0) &&
                                                                    <>
                                                                        <button className="category-edit-btn" value={secondCategory.CategoryID}
                                                                            onClick={(e) => {
                                                                                setSelectedCategory(e.target.value);
                                                                            }}
                                                                        ></button>
                                                                        <button className="category-delete-btn" onClick={() => setDelete(secondCategory.CategoryID)}></button>
                                                                    </>
                                                                }
                                                                <button className="subcategory-add-btn" onClick={() => setCreate(secondCategory.CategoryID)}></button>
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
                                                                            <form id={thirdCategory.CategoryID} name={thirdCategory.parentID} onSubmit={handleUpdate}>
                                                                                <input placeholder={thirdCategory.name} value={newName} onChange={(e) => setNewName(e.target.value)} required/>
                                                                                <div className="category-manage-btn-container">
                                                                                    <button type="submit" className="text-success me-3 save-text">Save</button>
                                                                                    <button type="button" className="text-secondary cancel-text" onClick={cancelUpdate}>Cancel</button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                        :
                                                                        <div className="category-name-container">
                                                                            <p>{thirdCategory.name} <span style={{color: "lightgray"}}>({thirdCategory.count} products)</span></p>
                                                                            <div className="category-manage-btn-container">
                                                                                {(thirdCategory.count===0) &&
                                                                                    <>
                                                                                        <button className="category-edit-btn" value={thirdCategory.CategoryID}
                                                                                            onClick={(e) => {
                                                                                                setSelectedCategory(e.target.value);
                                                                                            }}
                                                                                        ></button>
                                                                                        <button className="category-delete-btn" onClick={() => setDelete(thirdCategory.CategoryID)}></button>
                                                                                    </>
                                                                                }
                                                                                <button className="subcategory-add-btn" onClick={() => setCreate(thirdCategory.CategoryID)}></button>
                                                                            </div>
                                                                        </div>}
                                                                </div>

                                                                {selectedID.third === thirdCategory.CategoryID && (
                                                                    <div>
                                                                        {categories.filter(category => category.parentID === thirdCategory.CategoryID).map((fourthCategory) => (
                                                                            <div className="fourthCategory-container" key={fourthCategory.CategoryID}>
                                                                                {parseInt(selectedCategory) === fourthCategory.CategoryID ?
                                                                                    <div className="category-name-container">
                                                                                        <form id={fourthCategory.CategoryID} name={fourthCategory.parentID} onSubmit={handleUpdate}>
                                                                                            <input placeholder={fourthCategory.name} value={newName} onChange={(e) => setNewName(e.target.value)} required/>
                                                                                            {fourthCategory.attributes && (
                                                                                                <div>
                                                                                                    <p style={{color: "gray"}}>Attributes: <input placeholder={JSON.parse(fourthCategory.attributes).join(", ")} value={updatedAttributes} onChange={(e) => setUpdatedAttributes(e.target.value)} required/></p>
                                                                                                </div>
                                                                                            )}
                                                                                            <div className="category-manage-btn-container">
                                                                                                <button type="submit" className="text-success me-3 save-text">Save</button>
                                                                                                <button type="button" className="text-secondary cancel-text" onClick={cancelUpdate}>Cancel</button>
                                                                                            </div>
                                                                                        </form>
                                                                                    </div>
                                                                                    :
                                                                                    <div className="category-name-container">
                                                                                        <p>{fourthCategory.name}<span style={{color: "lightgray"}}>({fourthCategory.count} products)</span></p>
                                                                                        


                                                                                        {fourthCategory.attributes && (
                                                                                            <div>
                                                                                                <p className="ms-3"style={{color: "gray"}}>Attributes: {JSON.parse(fourthCategory.attributes).join(", ")}</p>
                                                                                            </div>
                                                                                        )}
                                                                                        
                                                                                        
                                                                                        
                                                                                        <div className="category-manage-btn-container">
                                                                                            {(fourthCategory.count===0) &&
                                                                                                <>
                                                                                                    <button className="category-edit-btn" value={fourthCategory.CategoryID}
                                                                                                        onClick={(e) => setSelectedCategory(e.target.value)}
                                                                                                    ></button>
                                                                                                    <button className="category-delete-btn" onClick={() => setDelete(fourthCategory.CategoryID)}></button>        
                                                                                                    <button className="subcategory-add-btn" onClick={() => setCreateAttribute(fourthCategory.CategoryID)}></button>
                                                                                                </>
                                                                                            }
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