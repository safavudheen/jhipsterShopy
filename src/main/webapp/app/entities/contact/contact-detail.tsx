import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './contact.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ContactDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const contactEntity = useAppSelector(state => state.contact.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="contactDetailsHeading">
          <Translate contentKey="busifrogApp.contact.detail.title">Contact</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{contactEntity.id}</dd>
          <dt>
            <span id="firstPersonName">
              <Translate contentKey="busifrogApp.contact.firstPersonName">First Person Name</Translate>
            </span>
          </dt>
          <dd>{contactEntity.firstPersonName}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="busifrogApp.contact.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{contactEntity.imageUrl}</dd>
          <dt>
            <span id="whatsappNumber">
              <Translate contentKey="busifrogApp.contact.whatsappNumber">Whatsapp Number</Translate>
            </span>
          </dt>
          <dd>{contactEntity.whatsappNumber}</dd>
          <dt>
            <span id="landlineNumber">
              <Translate contentKey="busifrogApp.contact.landlineNumber">Landline Number</Translate>
            </span>
          </dt>
          <dd>{contactEntity.landlineNumber}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="busifrogApp.contact.email">Email</Translate>
            </span>
          </dt>
          <dd>{contactEntity.email}</dd>
          <dt>
            <span id="addressLine1">
              <Translate contentKey="busifrogApp.contact.addressLine1">Address Line 1</Translate>
            </span>
          </dt>
          <dd>{contactEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">
              <Translate contentKey="busifrogApp.contact.addressLine2">Address Line 2</Translate>
            </span>
          </dt>
          <dd>{contactEntity.addressLine2}</dd>
          <dt>
            <span id="pincode">
              <Translate contentKey="busifrogApp.contact.pincode">Pincode</Translate>
            </span>
          </dt>
          <dd>{contactEntity.pincode}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="busifrogApp.contact.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{contactEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="busifrogApp.contact.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{contactEntity.longitude}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="busifrogApp.contact.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {contactEntity.createdDate ? <TextFormat value={contactEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="busifrogApp.contact.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {contactEntity.lastModifiedDate ? (
              <TextFormat value={contactEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="busifrogApp.contact.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{contactEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedBy">
              <Translate contentKey="busifrogApp.contact.lastModifiedBy">Last Modified By</Translate>
            </span>
          </dt>
          <dd>{contactEntity.lastModifiedBy}</dd>
          <dt>
            <span id="isDeleted">
              <Translate contentKey="busifrogApp.contact.isDeleted">Is Deleted</Translate>
            </span>
          </dt>
          <dd>{contactEntity.isDeleted ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/contact" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contact/${contactEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ContactDetail;
