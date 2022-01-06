import { useRef, useState } from 'react'
import {Card, Button, Col, Tooltip, OverlayTrigger, Row} from 'react-bootstrap'
import {useHistory} from 'react-router'

function AlbumCard({album, setActiveAlbum, deleteHandler, handleShowUpdate}) {

    const history = useHistory()
    const [show, setShow] = useState(false)
    const target = useRef(null)
    const renderInfo = (props) => (
        <Tooltip id='info-tooltip' {...props}>
            <p>Name: {album.name}</p>
            <p>Date: {album.date}</p>
            <p>Location: {album.location}</p>
            <p>Album Info: {album.description}</p>
        </Tooltip>
    )

    function handleClick() {
        setActiveAlbum(album);
        history.push('/album');        
    }

    return (
        <div className="album-card">
            <Col className='my-5 mx-3'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://picsum.photos/100/100" />
                    <Card.Body style={{"background-color": "#deb185"}}>
                        <Card.Title style={{"margin-bottom": '15px'}}>{album.name ? album.name : "No title"}</Card.Title>
                        <Row className='my-1'>
                            <Col sm={6}>
                                <Button id='view-btn' variant="primary" onClick={handleClick}>View Album</Button>
                            </Col>
                            <Col sm={6}>
                                <Button id='edit-btn' variant="primary" onClick={() => handleShowUpdate(album.name, album.description, album.location, album.date, album.id)}>Edit Details</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Button id='delete-btn' variant="danger" onClick={() => deleteHandler(album.id)}>Delete Album</Button>
                            </Col>
                            <Col className='d-flex justify-content-center align-items-center'>
                                <OverlayTrigger
                                    placement='right'
                                    delay={{ show: 150, hide: 200 }}
                                    overlay={renderInfo}
                                >
                                    <Button className='btn-circle btn-sm' ref={target} onClick={() => setShow(!show)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-lg" viewBox="0 0 16 16">
                                        <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"/>
                                    </svg>
                                    </Button>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default AlbumCard;
