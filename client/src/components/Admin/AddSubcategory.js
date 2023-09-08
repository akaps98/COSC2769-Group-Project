import React from "react";
import { Button, Modal } from "react-bootstrap";

function AddSubcategory({ addSubcategoryModalshow, handleAddSubcategoryModalClose, newName, setNewName, handleCreate }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        handleCreate();
    };
    return (
        <Modal show={addSubcategoryModalshow} onHide={handleAddSubcategoryModalClose} animation={false} centered>
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Add Subcategory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-2">
                        <label className="mb-2">Subcategory Name</label>
                        <input className="form-control" placeholder="Enter a name..." value={newName} onChange={(e) => setNewName(e.target.value)} required/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="outline-primary close-btn">
                        Add
                    </Button>
                    <Button type="button" variant="secondary close-btn" onClick={handleAddSubcategoryModalClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddSubcategory;