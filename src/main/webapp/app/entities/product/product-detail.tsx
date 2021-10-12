import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './product.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import './Style/product-details.scss';

export const ProductDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <div>
      <Row className="pl-5">
        <Col className="pl-3">
          <h2 data-cy="productDetailsHeading">
            <Translate contentKey="busifrogApp.product.detail.title">Product</Translate>
          </h2>
          <Row style={{ justifyContent: 'center' }}>
            <Col xs="12" sm="12" md="7" lg="7">
              <div className="p-3">
                <div className="product_details_image">
                  <img
                    className="w-100 mx-auto"
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    alt=""
                  />
                </div>
                <div className="product_details_image_temp_dev">
                  <img
                    className="product_details_image_temp"
                    src="https://media.istockphoto.com/photos/stylish-and-cool-boot-picture-id1276624783?k=20&m=1276624783&s=612x612&w=0&h=g9KHqQ6115Zh9VTgi5hyUDeD7zEA2p6zrdJHL5Y5UQM="
                    alt=""
                  />
                  <img
                    className="product_details_image_temp"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUhebJN4qjA3slYtMXbCTj2nPbhN4FIb9OJkboWi8WafmkAywyU3s-pbzVhMz0b6_NUhA&usqp=CAU"
                    alt=""
                  />
                  <img
                    className="product_details_image_temp"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20GJsML-XdRUL6WNUmeqlO8ePsmDBYBblTn-kTVN35uAwDrWBMZfFUcxcnh3ZbQ9PGBk&usqp=CAU"
                    alt=""
                  />
                </div>
              </div>
            </Col>
            <Col>
              <Table>
                <h4 className="product_detail_view_heading">Name of the Product</h4>
                <tbody>
                  <tr>
                    <td>Product Category</td>
                    <td></td>
                    <td>footwear</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Type of Metirial</td>
                    <td></td>
                    <td>Rubber</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td></td>
                    <td className="price_product_details">
                      {' '}
                      <h3>&#8377; 5020</h3>
                    </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Product Brand</td>
                    <td></td>
                    <td>Nike</td>
                    <td> </td>
                  </tr>
                </tbody>
              </Table>
              <p className="para_detailsofproduct">
                <h5>Short Discription</h5>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at nulla mollis, ultrices eros eget, dictum tortor. Curabitur
                turpis mauris, fringilla vel facilisis non, sodales a augue. Nam sollicitudin diam quam, ac venenatis sapien posuere vel.
                Suspendisse leo nisi, convallis eu luctus in, ullamcorper quis nisl
              </p>
              <div className="product_detailes_view_editbtn">
                <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
              </div>
            </Col>
          </Row>
          {/* <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="busifrogApp.product.name">Name</Translate>
            </span>
          </dt>
          <dd>{productEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="busifrogApp.product.code">Code</Translate>
            </span>
          </dt>
          <dd>{productEntity.code}</dd>
          <dt>
            <span id="filePath">
              <Translate contentKey="busifrogApp.product.filePath">File Path</Translate>
            </span>
          </dt>
          <dd>{productEntity.filePath}</dd>
          <dt>
            <span id="fileType">
              <Translate contentKey="busifrogApp.product.fileType">File Type</Translate>
            </span>
          </dt>
          <dd>{productEntity.fileType}</dd>
          <dt>
            <span id="shortDescription">
              <Translate contentKey="busifrogApp.product.shortDescription">Short Description</Translate>
            </span>
          </dt>
          <dd>{productEntity.shortDescription}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="busifrogApp.product.description">Description</Translate>
            </span>
          </dt>
          <dd>{productEntity.description}</dd>
          <dt>
            <span id="externalLink">
              <Translate contentKey="busifrogApp.product.externalLink">External Link</Translate>
            </span>
          </dt>
          <dd>{productEntity.externalLink}</dd>
          <dt>
            <Translate contentKey="busifrogApp.product.category">Category</Translate>
          </dt>
          <dd>{productEntity.category ? productEntity.category.name : ''}</dd>
          <dt>
            <Translate contentKey="busifrogApp.product.seller">Seller</Translate>
          </dt>
          <dd>{productEntity.seller ? productEntity.seller.name : ''}</dd>
        </dl> */}
        </Col>
      </Row>
      <Row className="pl-5">
        <Col md="10" sm="12">
          <p className="para_detailsofproduct">
            <h5>Details of The Product</h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at nulla mollis, ultrices eros eget, dictum tortor. C urabitur
            turpis mauris, fringilla vel facilisis non, sodales a augue. Nam sollicitudin diam quam, ac venenatis sapien posuere vel.
            Suspendisse leo nisi, convallis eu luctus in, ullamcorper quis nisl. Maecenas dolor nisi, gravida eget risus in, aliquam auctor
            quam. Cras sodales, tellus ut vehicula pulvinar, nibh metus condimentum metus, quis porttitor erat lectus ut justo. Ut a orci
            odio. Duis lobortis in elit eu aliquam. Aenean tempor tortor lorem, sit amet egestas lectus tincidunt sed. Aliquam eu aliquet
            erat. Nulla vehicula mauris leo, vitae vestibulum ex viverra in. Vestibulum pharetra, quam et posuere elementum, nulla tortor
            sagittis ex, sit amet congue nunc metus non massa. Pellentesque ut urna in nisl tempor commodo. Cras sodales lectus eu neque
            faucibus posuere. Phasellus ac enim purus. Nam vitae magna at neque sodales eleifend a scelerisque sem.
          </p>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
