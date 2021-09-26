import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './user-visit.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserVisitDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const userVisitEntity = useAppSelector(state => state.userVisit.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userVisitDetailsHeading">
          <Translate contentKey="busifrogApp.userVisit.detail.title">UserVisit</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userVisitEntity.id}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="busifrogApp.userVisit.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {userVisitEntity.startDate ? <TextFormat value={userVisitEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="busifrogApp.userVisit.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{userVisitEntity.endDate ? <TextFormat value={userVisitEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="busifrogApp.userVisit.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {userVisitEntity.createdDate ? <TextFormat value={userVisitEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="busifrogApp.userVisit.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {userVisitEntity.lastModifiedDate ? (
              <TextFormat value={userVisitEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="busifrogApp.userVisit.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{userVisitEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedBy">
              <Translate contentKey="busifrogApp.userVisit.lastModifiedBy">Last Modified By</Translate>
            </span>
          </dt>
          <dd>{userVisitEntity.lastModifiedBy}</dd>
          <dt>
            <span id="isDeleted">
              <Translate contentKey="busifrogApp.userVisit.isDeleted">Is Deleted</Translate>
            </span>
          </dt>
          <dd>{userVisitEntity.isDeleted ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="busifrogApp.userVisit.seller">Seller</Translate>
          </dt>
          <dd>{userVisitEntity.seller ? userVisitEntity.seller.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-visit" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-visit/${userVisitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserVisitDetail;
