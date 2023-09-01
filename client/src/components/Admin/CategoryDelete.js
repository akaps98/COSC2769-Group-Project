import React from "react";
import { Button, Modal } from "react-bootstrap";

function CategoryDelete({ deleteModalshow, handleDeleteModalClose }) {
    return (
        <Modal show={deleteModalshow} onHide={handleDeleteModalClose} animation={false} centered>
            <Modal.Header>
                <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete this category?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger close-btn" onClick={() => {
                    handleDeleteModalClose();
                }}>
                    Delete
                </Button>
                <Button variant="secondary close-btn" onClick={handleDeleteModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CategoryDelete;