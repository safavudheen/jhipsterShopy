import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './room.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const RoomDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const roomEntity = useAppSelector(state => state.room.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="roomDetailsHeading">
          <Translate contentKey="busifrogApp.room.detail.title">Room</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{roomEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="busifrogApp.room.name">Name</Translate>
            </span>
          </dt>
          <dd>{roomEntity.name}</dd>
          <dt>
            <span id="logoImageUrl">
              <Translate contentKey="busifrogApp.room.logoImageUrl">Logo Image Url</Translate>
            </span>
          </dt>
          <dd>{roomEntity.logoImageUrl}</dd>
          <dt>
            <span id="pincode">
              <Translate contentKey="busifrogApp.room.pincode">Pincode</Translate>
            </span>
          </dt>
          <dd>{roomEntity.pincode}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="busifrogApp.room.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{roomEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="busifrogApp.room.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{roomEntity.longitude}</dd>
          <dt>
            <span id="planExpiryDate">
              <Translate contentKey="busifrogApp.room.planExpiryDate">Plan Expiry Date</Translate>
            </span>
          </dt>
          <dd>
            {roomEntity.planExpiryDate ? <TextFormat value={roomEntity.planExpiryDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="busifrogApp.room.status">Status</Translate>
            </span>
          </dt>
          <dd>{roomEntity.status}</dd>
          <dt>
            <span id="websiteLink">
              <Translate contentKey="busifrogApp.room.websiteLink">Website Link</Translate>
            </span>
          </dt>
          <dd>{roomEntity.websiteLink}</dd>
          <dt>
            <Translate contentKey="busifrogApp.room.contact">Contact</Translate>
          </dt>
          <dd>{roomEntity.contact ? roomEntity.contact.firstPersonName : ''}</dd>
          <dt>
            <Translate contentKey="busifrogApp.room.sellerPlan">Seller Plan</Translate>
          </dt>
          <dd>{roomEntity.sellerPlan ? roomEntity.sellerPlan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/room" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/room/${roomEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RoomDetail;
