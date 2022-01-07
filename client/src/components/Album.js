import { Row, Col, Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import PictureCard from "./PictureCard";
import CarouselImage from "./CarouselImage";

function Album({activeAlbum}) {    
    const imgUrls = ['https://picsum.photos/500/500', 'https://picsum.photos/400/500', 'https://picsum.photos/500/400', 'https://picsum.photos/400/400', 'https://picsum.photos/600/500']
    const [allURLs, setAllURLs] = useState([]);
    const [show, setShow] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [index, setIndex] = useState(0)
    const [uploadPictures, setUploadPictures] = useState([]);    
    
    const defaultCards = imgUrls.map(imgUrl => <PictureCard imgUrl={imgUrl} handleShowImg={handleShowImg} />);
    let pictureCards = [];
    if (allURLs.length > 0) {
        pictureCards = allURLs.map(imgURL => <PictureCard imgUrl={imgURL.image_url} handleShowImg={handleShowImg} />);
    }

    function generatePictureCards (allURLs) {
        let pictureCards = [];
        if (allURLs.length > 0) {
            let setIds = 0
            pictureCards = allURLs.map(imgURL => <PictureCard imgUrl={imgURL.image_url} currId={setIds++} handleShowImg={handleShowImg} />);
        } else {
            pictureCards = imgUrls.map(imgUrl => <PictureCard imgUrl={imgUrl} handleShowImg={handleShowImg} />);
        }
        return pictureCards;
    }

    let testCards = generatePictureCards(allURLs);
    
    //Load associated picture records on load of /Album endpoint
    useEffect(() => {
        console.log("Inside Album useEffect");        
        const picFetchURL = `/albums/${activeAlbum.id}`;
        fetch(picFetchURL)
        .then(res => res.json())
        .then(response => {
            console.log("Successful fetch - displaying results");
            console.log(response);
            setAllURLs(response);
        });        
    },[]);

    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setShow(false)
    }

    function handleShowImg(id) {
        setIndex(id)
        setShowImg(true)
    }

    function handleCloseImg() {
        setShowImg(false)
    }
    
    //upload helpers (within modal)
    function changeHandler(e) {
        const form = e.target;
        const allFiles = form.files;
        setUploadPictures(Object.values(allFiles));        
    } 
    
    //upload helper (within modal)    
    function submitHandler(e) {
        e.preventDefault();
        //verify upload attempt isn't empty
        if (uploadPictures.length > 0) {            
            //verify upload attempt contains the expected datatype
            if (uploadPictures[0] instanceof File) {                
                //fetch() constants
                const postURL = 'https://api.cloudinary.com/v1_1/flatironstudent/image/upload';
                const secondPostURL = '/pictures';                
                //need to create fetches to cloudinary and pictostash for each picture upload
                for (const file of uploadPictures) {
                    //create form data object
                    let fd = new FormData();
                    //append file and preset
                    fd.append('file', file);
                    fd.append('upload_preset', 'unsigned_user');
                    //each file will need its own postConfig
                    const postConfig = {
                        method: 'POST',
                        body: fd
                    };
                    //upload pre-work completed - start work
                    fetch(postURL, postConfig)
                    .then(res => res.json())
                    .then(response => {                        
                        let imgURL = response.secure_url;                        
                        //console.log(imgURL);
                        const picRecord = {
                            album_id: activeAlbum.id,
                            image_url: imgURL
                        };                        
                        const secondPostConfig = {
                            method: 'POST',
                            headers: {'Content-Type':'application/json'},
                            body: JSON.stringify(picRecord)
                        };
                        fetch(secondPostURL, secondPostConfig)
                        .then(res => res.json())
                        .then(pictureRecordObj => {
                            //console.log(pictureRecordObj);
                            setAllURLs([...allURLs, pictureRecordObj]);
                        });
                    });
                }
                //END for loop for fetches
                //CLEANUP
                setUploadPictures([]);
                handleClose();                
            } else {
                console.log("State does not appear to contain image data to upload X_X");
            }
        } else {
            console.log("Seeing empty upload attempt. Need to add error here.");
        }        
    }

    return (
        <div className="container d-flex flex-column image-list">
            <Row>
                <Col lg={12}>
                    <h1 className="text-center my-5">{activeAlbum.name}</h1>
                </Col>
            </Row>
            <Row sm="auto" className="d-flex justify-content-center">
                {testCards}
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
                        <Form.Control type="file" onChange={changeHandler} multiple/>
                    </Form>                        
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitHandler}>
                        {uploadPictures.length === 1 ? "Upload Photo" : "Upload Photos"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showImg} onHide={handleCloseImg} centered>
                {allURLs.length > 0 ? <CarouselImage imgUrls={allURLs} index={index} setIndex={setIndex} /> : <CarouselImage imgUrls={imgUrls} index={index} setIndex={setIndex} />}
            </Modal>
        </div>
    )
}

export default Album;