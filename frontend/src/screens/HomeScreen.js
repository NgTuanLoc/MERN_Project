import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../actions/productActions";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productListContent = loading ? (
    <Row />
  ) : (
    <Row>
      {products.map((product) => {
        return (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        );
      })}
    </Row>
  );

  useEffect(() => {
    dispatch(listProducts);
  }, [dispatch]);
  return (
    <Container>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        productListContent
      )}
    </Container>
  );
};

export default HomeScreen;
