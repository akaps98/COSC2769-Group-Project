import React from "react";
import { Button, Modal } from "react-bootstrap";

function AddCategory({ addModalshow, handleAddModalClose }) {
    return (
        <Modal show={addModalshow} onHide={handleAddModalClose} animation={false} centered>
            <Modal.Header>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-2">
                    <label className="mb-2">Category Name</label>
                    <input className="form-control" placeholder="Enter a name..." />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary close-btn" onClick={() => {
                    handleAddModalClose();
                }}>
                    Add
                </Button>
                <Button variant="secondary close-btn" onClick={handleAddModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCategory;