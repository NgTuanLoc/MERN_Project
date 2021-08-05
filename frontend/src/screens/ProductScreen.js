import { Fragment } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = ({ match }) => {
  const product = products.find((item) => item._id === match.params.id);
  return (
    <Fragment>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.brand} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.price}
                text={`${product.rating} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Price: ${product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status</Col>
                <Col>{product.countInStock ? "In Stock" : "Out Of Stock"}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="mx-auto">
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductScreen;