import { Card } from "react-bootstrap";
import Rating from "./Rating";
import PropsTypes from 'prop-types'

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}

            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Rating.defaultProps = {
    color: '# F5C71B' 
}

Rating.propTypes = {
    text: PropsTypes.string.isRequired,
    value: PropsTypes.number.isRequired,
    color: PropsTypes.string
}
export default Product;
