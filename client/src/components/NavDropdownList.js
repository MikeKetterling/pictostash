import { NavDropdown } from "react-bootstrap";
import {NavLink, useParams, useHistory} from "react-router-dom"

function NavDropdownList({albums, setActiveAlbum}) {
    const history = useHistory()

    // const params = useParams()

    // function albumNav(e, id) {
    //     setActiveAlbum(album.id)
    // }

    function albumNav(e, album) {
        console.log(album)
        setActiveAlbum(album);
        history.push(`/album`);        
    }


    const items = albums.map(album => <NavDropdown.Item
        as={NavLink} to={`/album/${album.id}`} onClick={(e) => albumNav(e, album)}>{album.name}</NavDropdown.Item>)



    return (
        <NavDropdown title="Album Quick Find" id="offcanvasNavbarDropdown">
            {items}
        </NavDropdown>

    )
}

export default NavDropdownList;