import { Carousel } from "react-bootstrap";

function CarouselImage({imgUrls, index, setIndex}) {

    let unpackedURLs = [];
    
    if (imgUrls[0]?.image_url !== undefined) {
        unpackedURLs = imgUrls.map(imgRecord => imgRecord.image_url)
    } else {
        unpackedURLs = imgUrls;
    }

    const items = unpackedURLs.map(url => <Carousel.Item>
        <img className="d-block w-100" src={url} alt="" />
    </Carousel.Item>)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {items}
        </Carousel>
    )
}

export default CarouselImage;