import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './seller-plan.reducer';
import { ISellerPlan } from 'app/shared/model/seller-plan.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SellerPlan = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const sellerPlanList = useAppSelector(state => state.sellerPlan.entities);
  const loading = useAppSelector(state => state.sellerPlan.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="seller-plan-heading" data-cy="SellerPlanHeading">
        <Translate contentKey="busifrogApp.sellerPlan.home.title">Seller Plans</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="busifrogApp.sellerPlan.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="busifrogApp.sellerPlan.home.createLabel">Create new Seller Plan</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {sellerPlanList && sellerPlanList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.products">Products</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.services">Services</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.monthlyPrice">Monthly Price</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.annualPrice">Annual Price</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.discount">Discount</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.lastModifiedDate">Last Modified Date</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.lastModifiedBy">Last Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.sellerPlan.isDeleted">Is Deleted</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sellerPlanList.map((sellerPlan, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${sellerPlan.id}`} color="link" size="sm">
                      {sellerPlan.id}
                    </Button>
                  </td>
                  <td>{sellerPlan.name}</td>
                  <td>{sellerPlan.products}</td>
                  <td>{sellerPlan.services}</td>
                  <td>{sellerPlan.monthlyPrice}</td>
                  <td>{sellerPlan.annualPrice}</td>
                  <td>{sellerPlan.discount}</td>
                  <td>
                    {sellerPlan.createdDate ? <TextFormat type="date" value={sellerPlan.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {sellerPlan.lastModifiedDate ? (
                      <TextFormat type="date" value={sellerPlan.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{sellerPlan.createdBy}</td>
                  <td>{sellerPlan.lastModifiedBy}</td>
                  <td>{sellerPlan.isDeleted ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${sellerPlan.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sellerPlan.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sellerPlan.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="busifrogApp.sellerPlan.home.notFound">No Seller Plans found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SellerPlan;
