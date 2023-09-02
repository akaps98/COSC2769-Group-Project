import React from "react";
import { Button, Modal } from "react-bootstrap";

function AddCategory({ addModalshow, handleAddModalClose, newName, setNewName, handleCreate }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        handleCreate();
    };
    return (
        <Modal show={addModalshow} onHide={handleAddModalClose} animation={false} centered>
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-2">
                        <label className="mb-2">Category Name</label>
                        <input className="form-control" placeholder="Enter a name..." value={newName} onChange={(e) => setNewName(e.target.value)} required/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="outline-primary close-btn">
                        Add
                    </Button>
                    <Button type="button" variant="secondary close-btn" onClick={handleAddModalClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddCategory;