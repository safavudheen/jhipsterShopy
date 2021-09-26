import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './service.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ServiceDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const serviceEntity = useAppSelector(state => state.service.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="serviceDetailsHeading">
          <Translate contentKey="busifrogApp.service.detail.title">Service</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{serviceEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="busifrogApp.service.name">Name</Translate>
            </span>
          </dt>
          <dd>{serviceEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="busifrogApp.service.code">Code</Translate>
            </span>
          </dt>
          <dd>{serviceEntity.code}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="busifrogApp.service.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{serviceEntity.imageUrl}</dd>
          <dt>
            <span id="shortDescription">
              <Translate contentKey="busifrogApp.service.shortDescription">Short Description</Translate>
            </span>
          </dt>
          <dd>{serviceEntity.shortDescription}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="busifrogApp.service.description">Description</Translate>
            </span>
          </dt>
          <dd>{serviceEntity.description}</dd>
          <dt>
            <span id="externalLink">
              <Translate contentKey="busifrogApp.service.externalLink">External Link</Translate>
            </span>
          </dt>
          <dd>{serviceEntity.externalLink}</dd>
          <dt>
            <Translate contentKey="busifrogApp.service.category">Category</Translate>
          </dt>
          <dd>{serviceEntity.category ? serviceEntity.category.name : ''}</dd>
          <dt>
            <Translate contentKey="busifrogApp.service.seller">Seller</Translate>
          </dt>
          <dd>{serviceEntity.seller ? serviceEntity.seller.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/service" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/service/${serviceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ServiceDetail;
