import { useRef, useState } from 'react'
import {Card, Button, Col, Tooltip, OverlayTrigger} from 'react-bootstrap'
import {useHistory} from 'react-router'

function AlbumCard() {

    const history = useHistory()
    const [show, setShow] = useState(false)
    const target = useRef(null)
    const renderInfo = (props) => (
        <Tooltip id='info-tooltip' {...props}>
            <p>Time:</p>
            <p>Location:</p>
            <p>Album Info:</p>
        </Tooltip>
    )

    function handleClick() {
        history.push('/album')
    }

    return (
        <div className="album-card">
            <Col className='my-5 mx-3'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://picsum.photos/100/100" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <div className='album-btns'>
                            <Button variant="primary" onClick={handleClick}>View Album</Button>
                            <OverlayTrigger
                                placement='left'
                                delay={{ show: 150, hide: 200 }}
                                overlay={renderInfo}
                            >
                                <Button className='btn-circle btn-sm' ref={target} onClick={() => setShow(!show)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default AlbumCard;
