import { NavDropdown } from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom"

function NavDropdownList({albums}) {

    const params = useParams()


    const items = albums.map(album => <NavDropdown.Item
        as={NavLink} to={`/album/${album.id}`}>{album.name}</NavDropdown.Item>)



    return (
        <NavDropdown title="Album Quick Find" id="offcanvasNavbarDropdown">
            {items}
        </NavDropdown>

    )
}

export default NavDropdownList;