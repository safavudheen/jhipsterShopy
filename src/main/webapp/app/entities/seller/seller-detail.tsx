import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './seller.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SellerDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const sellerEntity = useAppSelector(state => state.seller.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sellerDetailsHeading">
          <Translate contentKey="busifrogApp.seller.detail.title">Seller</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{sellerEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="busifrogApp.seller.name">Name</Translate>
            </span>
          </dt>
          <dd>{sellerEntity.name}</dd>
          <dt>
            <span id="logoImageUrl">
              <Translate contentKey="busifrogApp.seller.logoImageUrl">Logo Image Url</Translate>
            </span>
          </dt>
          <dd>{sellerEntity.logoImageUrl}</dd>
          <dt>
            <span id="pincode">
              <Translate contentKey="busifrogApp.seller.pincode">Pincode</Translate>
            </span>
          </dt>
          <dd>{sellerEntity.pincode}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="busifrogApp.seller.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{sellerEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="busifrogApp.seller.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{sellerEntity.longitude}</dd>
          <dt>
            <span id="planExpiryDate">
              <Translate contentKey="busifrogApp.seller.planExpiryDate">Plan Expiry Date</Translate>
            </span>
          </dt>
          <dd>
            {sellerEntity.planExpiryDate ? <TextFormat value={sellerEntity.planExpiryDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="busifrogApp.seller.status">Status</Translate>
            </span>
          </dt>
          <dd>{sellerEntity.status}</dd>
          <dt>
            <span id="websiteLink">
              <Translate contentKey="busifrogApp.seller.websiteLink">Website Link</Translate>
            </span>
          </dt>
          <dd>{sellerEntity.websiteLink}</dd>
          <dt>
            <Translate contentKey="busifrogApp.seller.contact">Contact</Translate>
          </dt>
          <dd>{sellerEntity.contact ? sellerEntity.contact.firstPersonName : ''}</dd>
          <dt>
            <Translate contentKey="busifrogApp.seller.sellerPlan">Seller Plan</Translate>
          </dt>
          <dd>{sellerEntity.sellerPlan ? sellerEntity.sellerPlan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/seller" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/seller/${sellerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SellerDetail;
