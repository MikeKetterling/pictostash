import { Carousel } from "react-bootstrap";

function CarouselImage({imgUrls, index, setIndex}) {

    const items = imgUrls.map(url => <Carousel.Item>
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