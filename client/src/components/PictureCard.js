import {Card, Button, Col} from 'react-bootstrap'

function PictureCard() {
    return (
        <div className="picture-card">
            <Col className='my-5 mx-3'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://picsum.photos/100/100" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">View Image</Button>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default PictureCard;