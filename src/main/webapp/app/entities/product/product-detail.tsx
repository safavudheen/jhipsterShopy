import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './product.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProductDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">
          <Translate contentKey="busifrogApp.product.detail.title">Product</Translate>
        </h2>
        <dl className="jh-entity-details">
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
            <Translate contentKey="busifrogApp.product.room">Room</Translate>
          </dt>
          <dd>{productEntity.room ? productEntity.room.name : ''}</dd>
        </dl>
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
      </Col>
    </Row>
  );
};

export default ProductDetail;
