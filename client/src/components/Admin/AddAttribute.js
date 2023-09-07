import React from "react";
import { Button, Modal } from "react-bootstrap";

function AddAttribute({ addAttributeModalshow, handleAddAttributeModalClose, newAttribute, setNewAttribute, handleCreateAttribute }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        handleCreateAttribute();
    };
    return (
        <Modal show={addAttributeModalshow} onHide={handleAddAttributeModalClose} animation={false} centered>
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Add Attribute</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-2">
                        <label className="mb-2">Attribute Name</label>
                        <input className="form-control" placeholder="Enter a name..." value={newAttribute} onChange={(e) => setNewAttribute(e.target.value)} required/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="outline-primary close-btn">
                        Add
                    </Button>
                    <Button type="button" variant="secondary close-btn" onClick={handleAddAttributeModalClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddAttribute;