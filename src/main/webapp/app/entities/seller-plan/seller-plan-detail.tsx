import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './seller-plan.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SellerPlanDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const sellerPlanEntity = useAppSelector(state => state.sellerPlan.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sellerPlanDetailsHeading">
          <Translate contentKey="busifrogApp.sellerPlan.detail.title">SellerPlan</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="busifrogApp.sellerPlan.name">Name</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.name}</dd>
          <dt>
            <span id="products">
              <Translate contentKey="busifrogApp.sellerPlan.products">Products</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.products}</dd>
          <dt>
            <span id="services">
              <Translate contentKey="busifrogApp.sellerPlan.services">Services</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.services}</dd>
          <dt>
            <span id="monthlyPrice">
              <Translate contentKey="busifrogApp.sellerPlan.monthlyPrice">Monthly Price</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.monthlyPrice}</dd>
          <dt>
            <span id="annualPrice">
              <Translate contentKey="busifrogApp.sellerPlan.annualPrice">Annual Price</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.annualPrice}</dd>
          <dt>
            <span id="discount">
              <Translate contentKey="busifrogApp.sellerPlan.discount">Discount</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.discount}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="busifrogApp.sellerPlan.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {sellerPlanEntity.createdDate ? <TextFormat value={sellerPlanEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="busifrogApp.sellerPlan.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {sellerPlanEntity.lastModifiedDate ? (
              <TextFormat value={sellerPlanEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="busifrogApp.sellerPlan.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedBy">
              <Translate contentKey="busifrogApp.sellerPlan.lastModifiedBy">Last Modified By</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.lastModifiedBy}</dd>
          <dt>
            <span id="isDeleted">
              <Translate contentKey="busifrogApp.sellerPlan.isDeleted">Is Deleted</Translate>
            </span>
          </dt>
          <dd>{sellerPlanEntity.isDeleted ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/seller-plan" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/seller-plan/${sellerPlanEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SellerPlanDetail;
