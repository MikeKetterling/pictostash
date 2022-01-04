import { Row, Col, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import PictureCard from "./PictureCard";

function Album() {
    const [show, setShow] = useState(false)

    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setShow(false)
    }

    return (
        <div className="container d-flex flex-column image-list">
            <Row>
                <Col lg={12}>
                    <h1 className="text-center my-5">ALBUM NAME</h1>
                </Col>
            </Row>
            <Row sm="auto" className="d-flex justify-content-center">
                <PictureCard/>
                <PictureCard/>
                <PictureCard/>
                <PictureCard/>
                <PictureCard/>
            </Row>
            <Button className="my-5 btn-circle btn-xl fixed-bottom" variant="primary" onClick={handleShow}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Upload form goes here!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Upload Photo
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Album;