import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import AlbumCard from "./AlbumCard";
import {useState} from "react";

function AlbumList({user, albums, addNewAlbum, activeAlbum, setActiveAlbum, setUserAlbums}) {

    const [show, setShow] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [hasName, setHasName] = useState(true)
    const [hasDescription, setHasDescription] = useState(true)
    const [hasLocation, setHasLocation] = useState(true)
    const [hasDate, setHasDate] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        date: ''
    })
    const [updateForm, setUpdateForm] = useState({
        name: '',
        description: '',
        location: '',
        date: '',
        id: ''
    })

    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setShow(false)
    }

    function handleShowUpdate(name, description, location, date, id) {
        setUpdateForm({
            name: name,
            description: description,
            location: location,
            date: date,
            id: id
        })
        setShowUpdateForm(true)
    }

    function handleCloseUpdate() {
        setShowUpdateForm(false)
    }

    const allAlbumCards = albums.map(album => <AlbumCard
        key={album.id}
        album={album}
        setActiveAlbum={setActiveAlbum}
        deleteHandler={deleteHandler}
        handleShowUpdate={handleShowUpdate}
        />);
    
    //upload helpers (within modal)
    function changeHandler(e) {
        const key = e.target.name;
        const val = e.target.value;
        setFormData({
            ...formData,
            [key]: val
        });
    } 

    function changeUpdateHandler(e) {
        const key = e.target.name;
        const val = e.target.value;
        setUpdateForm({
            ...updateForm,
            [key]: val
        });
    }
    
    //upload helper (within modal)    
    function submitHandler(e) {
        e.preventDefault();
        if (formData.name.length === 0 || formData.description.length === 0 || formData.location.length === 0 || formData.date.length === 0) {
            formData.name === '' ? setHasName(false) : setHasName(true)
            formData.description === '' ? setHasDescription(false) : setHasDescription(true)
            formData.location === '' ? setHasLocation(false) : setHasLocation(true)
            formData.date === '' ? setHasDate(false) : setHasDate(true)
            console.log("I see you trying to submit baaaad data ='(");
        } else {            
            console.log('I see you trying to create a new album.');
            const postURL = '/albums';
            const postConfig = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(formData)
            };
            fetch(postURL, postConfig)
            .then(res => res.json())
            .then(responseAlbumObj => {
                addNewAlbum(responseAlbumObj)
                setFormData({
                    name: '',
                    description: '',
                    location: '',
                    date: ''
                })
                setHasName(true)
                setHasDescription(true)
                setHasLocation(true)
                setHasDate(true)
            });
            handleClose(); 
        }               
    }

    function deleteHandler(id) {
        const filteredAlbums = albums.filter(album => album.id !== id)
        console.log(filteredAlbums)
        setUserAlbums([...filteredAlbums])
        fetch(`/albums/${id}`, {method: "DELETE"})
    }

    function editHandler() {
        console.log(albums)
        if (updateForm.name !== '' && updateForm.description !== '' && updateForm.location !== '' && updateForm.date !== '') {
            const newAlbums = albums.map(album => {
                if (album.id === updateForm.id) {
                    console.log('here')
                    return {
                        name: updateForm.name,
                        description: updateForm.description,
                        location: updateForm.location,
                        date: updateForm.date,
                        id: updateForm.id,
                        user_id: user.id
                    }
                } else {
                    console.log(album)
                    return album
                }
            })
            console.log(newAlbums)
            setUserAlbums([...newAlbums])
            fetch(`/albums/${updateForm.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateForm)
            })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                handleCloseUpdate()
            })
        } else {
            console.log("cannot apply changes")
        }
    }
    
    return (
        <div className="container image-list">
            <Row>
                <Col lg={12}>
                    <h1 className="text-center my-5">{user?.username ? `${user.username.toUpperCase()}'S ALBUMS` : "YOUR ALBUMS"}</h1>
                </Col>
            </Row>
            <Row sm="auto" className="d-flex justify-content-center">
                {allAlbumCards}
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
                    <Modal.Title>Create new Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Control type="text" name="name" placeholder="album name" onChange={changeHandler} value={formData.name}/>
                        {hasName ? null : <Form.Text className='invalid-input' style={{color: 'red'}} >You must enter a name.</Form.Text>}
                        <Form.Control type="text" name="description" placeholder="description" onChange={changeHandler} value={formData.description}/>
                        {hasDescription ? null : <Form.Text className='invalid-input' style={{color: 'red'}} >You must enter a description.</Form.Text>}
                        <Form.Control type="text" name="location" placeholder="location" onChange={changeHandler} value={formData.location}/>
                        {hasLocation ? null : <Form.Text className='invalid-input' style={{color: 'red'}} >You must enter a location.</Form.Text>}
                        <Form.Control type="date" name="date" onChange={changeHandler} value={formData.date}/>
                        {hasDate ? null : <Form.Text className='invalid-input' style={{color: 'red'}} >You must enter a date.</Form.Text>}
                    </Form>                        
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitHandler}>
                        Create Album
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdateForm} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Your Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editHandler}>
                        <Form.Text className='invalid-input' >Album Name</Form.Text>
                        <Form.Control type="text" name="name" placeholder="album name" onChange={changeUpdateHandler} value={updateForm.name}/>
                        {updateForm.name !== '' ? null : <Form.Text className='invalid-input' style={{color: 'red'}} >You must enter a name.</Form.Text>}
                        <Form.Text className='invalid-input' >Description</Form.Text>
                        <Form.Control type="text" name="description" placeholder="description" onChange={changeUpdateHandler} value={updateForm.description}/>
                        {updateForm.description !== '' ? null : <Form.Text className='invalid-input' style={{color: 'red'}} >You must enter a description.</Form.Text>}
                        <Form.Text className='invalid-input' >Location</Form.Text>
                        <Form.Control type="text" name="location" placeholder="location" onChange={changeUpdateHandler} value={updateForm.location}/>
                        {updateForm.location !== '' ? null : <Form.Text className='invalid-input' style={{color: 'red'}} >You must enter a location.</Form.Text>}
                        <Form.Text className='invalid-input' >Date</Form.Text>
                        <Form.Control type="date" name="date" onChange={changeUpdateHandler} value={updateForm.date}/>
                        {updateForm.date !== '' ? null : <Form.Text className='invalid-input' style={{color: 'red'}} >You must enter a date.</Form.Text>}
                    </Form>                        
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={editHandler}>
                        Apply Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AlbumList;
