import { Fragment } from "react";
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Products = () => {
    return ( 
        <Fragment>
           <Container className="my-5 p-3">
           <Link to="/profile">Click here to profile</Link>
           </Container>
        </Fragment>

     );
}

export default Products;