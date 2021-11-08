import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, FormGroup, Input, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { view_product } from './search-reducer';
import { getProductAPI } from './search-reducer';
import { values } from 'lodash';

export const CategoryProductSearch = () => {
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProduct, setFilteredProduct] = useState([]);
  const productList = useAppSelector(state => state.productSearch.value);

  //  setProduct(productList.data)
  console.log('hey kooi', productList);

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get("https://fakestoreapi.com/products").then((res) => {
  //     setProduct(res.data);
  //     setLoading(false);
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }, [])

  // useEffect(() => {
  //   dispatch( getProductAPI()
  // }, []);

  useEffect(() => {
    setFilteredProduct(product.filter(prod => prod.title.toLowerCase().includes(search.toLowerCase())));
  }, [search, product]);

  return (
    <div>
      <Row className="ml-5 mt-3">
        <Col className="md-12">
          <FormGroup>
            <Input type="email" name="email" id="exampleEmail" placeholder="Search product" onChange={e => setSearch(e.target.value)} />
          </FormGroup>
        </Col>
      </Row>
      <Row className="ml-5 mt-3">
        {filteredProduct.map((data, index) => (
          <Col md="3">
            <Card>
              <CardImg top width="100%" style={{ height: '12rem' }} src={data.image} alt="Card image cap" />
              <CardBody>
                <CardTitle tag="h5">{data.title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Card subtitle
                </CardSubtitle>
                <CardText>{data.price}</CardText>
                <CardText>{data.category}</CardText>
                <CardText style={{ maxHeight: '2rem', overflow: 'hidden' }}>{data.description}</CardText>
                <CardText>{data.price}</CardText>
                <p>*{data.rating.rate}</p>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
  // if (loading) {
  //   return <p style={{ textAlign: "center" }}>Please wait data Loading</p>
  // }
};

export default CategoryProductSearch;
