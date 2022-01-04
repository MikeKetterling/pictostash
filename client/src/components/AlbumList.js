import { Row, Col } from "react-bootstrap";
import AlbumCard from "./AlbumCard";

function AlbumList() {
    return (
        <div className="container image-list">
            <Row>
                <Col lg={12}>
                    <h1 className="text-center my-5">YOUR ALBUMS</h1>
                </Col>
            </Row>
            <Row sm="auto" className="d-flex justify-content-center">
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
            </Row>
        </div>
    )
}

export default AlbumList;
