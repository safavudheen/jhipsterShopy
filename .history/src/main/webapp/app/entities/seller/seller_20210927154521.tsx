import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './seller.reducer';
import { ISeller } from 'app/shared/model/seller.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Seller = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const sellerList = useAppSelector(state => state.seller.entities);
  const loading = useAppSelector(state => state.seller.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <div className="ml"></div>
      <h2 id="seller-heading" data-cy="SellerHeading">
        <Translate contentKey="busifrogApp.seller.home.title">Sellers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="busifrogApp.seller.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="busifrogApp.seller.home.createLabel">Create new Seller</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {sellerList && sellerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="busifrogApp.seller.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.logoImageUrl">Logo Image Url</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.pincode">Pincode</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.latitude">Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.longitude">Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.planExpiryDate">Plan Expiry Date</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.websiteLink">Website Link</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.contact">Contact</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.seller.sellerPlan">Seller Plan</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sellerList.map((seller, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${seller.id}`} color="link" size="sm">
                      {seller.id}
                    </Button>
                  </td>
                  <td>{seller.name}</td>
                  <td>{seller.logoImageUrl}</td>
                  <td>{seller.pincode}</td>
                  <td>{seller.latitude}</td>
                  <td>{seller.longitude}</td>
                  <td>
                    {seller.planExpiryDate ? <TextFormat type="date" value={seller.planExpiryDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    <Translate contentKey={`busifrogApp.SellerStatus.${seller.status}`} />
                  </td>
                  <td>{seller.websiteLink}</td>
                  <td>{seller.contact ? <Link to={`contact/${seller.contact.id}`}>{seller.contact.firstPersonName}</Link> : ''}</td>
                  <td>{seller.sellerPlan ? <Link to={`seller-plan/${seller.sellerPlan.id}`}>{seller.sellerPlan.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${seller.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${seller.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${seller.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="busifrogApp.seller.home.notFound">No Sellers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Seller;
