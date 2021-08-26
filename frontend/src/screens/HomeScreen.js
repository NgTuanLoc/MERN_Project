import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listProducts } from "../actions/productActions";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;
  const productListContent = loading ? (
    <Row />
  ) : (
    <Fragment>
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </Fragment>
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <Container>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        productListContent
      )}
    </Container>
  );
};

export default HomeScreen;
