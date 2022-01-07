import {Card, Button, Col} from 'react-bootstrap'

function PictureCard({imgUrl, handleShowImg, currId}) {
    return (
        <div className="picture-card">
            <Col className='my-5 mx-3'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img className='card-img' variant="top" src={imgUrl} style={{'objectFit': 'cover'}} />
                    <Card.Body style={{"backgroundColor": "#deb185", "textAlign": "center"}}>
                        <Button variant="primary" onClick={() => handleShowImg(currId)}>View Image</Button>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default PictureCard;