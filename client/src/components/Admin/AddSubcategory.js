import React from "react";
import { Button, Modal } from "react-bootstrap";

function AddSubcategory({ addSubcategoryModalshow, handleAddSubcategoryModalClose }) {
    return (
        <Modal show={addSubcategoryModalshow} onHide={handleAddSubcategoryModalClose} animation={false} centered>
            <Modal.Header>
                <Modal.Title>Add Subcategory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-2">
                    <label className="mb-2">Subcategory Name</label>
                    <input className="form-control" placeholder="Enter a name..." />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary close-btn" onClick={() => {
                    handleAddSubcategoryModalClose();
                }}>
                    Add
                </Button>
                <Button variant="secondary close-btn" onClick={handleAddSubcategoryModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddSubcategory;