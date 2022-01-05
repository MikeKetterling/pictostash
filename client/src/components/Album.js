import { Row, Col, Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import PictureCard from "./PictureCard";
import CarouselImage from "./CarouselImage";

function Album() {
    const imgUrls = ['https://picsum.photos/500/500', 'https://picsum.photos/400/500', 'https://picsum.photos/500/400', 'https://picsum.photos/400/400', 'https://picsum.photos/600/500']
    const [show, setShow] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [index, setIndex] = useState(0)

    const pictureCards = imgUrls.map(imgUrl => <PictureCard imgUrl={imgUrl} handleShowImg={handleShowImg} />)
    const [uploadPic, setUploadPic] = useState([]);

    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setShow(false)
    }

    function handleShowImg() {
        setShowImg(true)
    }

    function handleCloseImg() {
        setShowImg(false)
    }
    
    //upload helpers (within modal)
    function changeHandler(e) {
        const form = e.currentTarget;
        const allFiles = form.files;
        setUploadPic(allFiles[0]);
    } 
    
    //upload helper (within modal)    
    function submitHandler(e) {
        e.preventDefault();
        //initial upload pre-work
        let formData = new FormData();
        formData.append('file', uploadPic);
        formData.append('upload_preset', 'unsigned_user');
        const postURL = 'https://api.cloudinary.com/v1_1/flatironstudent/image/upload';
        const postConfig = {
            method: 'POST',
            body: formData
        };
        
        //initial upload work
        fetch(postURL, postConfig)
        .then(res => res.json())
        .then(response => {
            handleClose();
            let imgURL = response.secure_url;
            console.log(imgURL);
            const picRecord = {
                //need to have access to album_id here
                album_id: 1,
                image_url: imgURL
            };
            const secondPostURL = 'http://localhost:3000/pictures';
            const secondPostConfig = {
                method: 'POST',
                headers: {'Content-Type':'Application/json'},
                body: JSON.stringify(picRecord)
            };
            //fetch(secondPostURL, secondPostConfig)
            //.then(res => res.json())
            //.then(response => console.log(response));
            //need a POST target for /pictures resource here
        });
        //still need to close the modal window on upload
        //and create associated records for pic upload
    }

    return (
        <div className="container d-flex flex-column image-list">
            <Row>
                <Col lg={12}>
                    <h1 className="text-center my-5">ALBUM NAME</h1>
                </Col>
            </Row>
            <Row sm="auto" className="d-flex justify-content-center">
                {pictureCards}
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
                <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Control type="file" onChange={changeHandler} />                        
                    </Form>                        
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitHandler}>
                        Upload Photo
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showImg} onHide={handleCloseImg} centered>
                <CarouselImage imgUrls={imgUrls} index={index} setIndex={setIndex} />
            </Modal>
        </div>
    )
}

export default Album;