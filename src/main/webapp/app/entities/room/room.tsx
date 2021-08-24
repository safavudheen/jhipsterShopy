import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './room.reducer';
import { IRoom } from 'app/shared/model/room.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Room = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const roomList = useAppSelector(state => state.room.entities);
  const loading = useAppSelector(state => state.room.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="room-heading" data-cy="RoomHeading">
        <Translate contentKey="busifrogApp.room.home.title">Rooms</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="busifrogApp.room.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="busifrogApp.room.home.createLabel">Create new Room</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {roomList && roomList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="busifrogApp.room.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.logoImageUrl">Logo Image Url</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.pincode">Pincode</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.latitude">Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.longitude">Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.planExpiryDate">Plan Expiry Date</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.websiteLink">Website Link</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.lastModifiedDate">Last Modified Date</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.lastModifiedBy">Last Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.isDeleted">Is Deleted</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.contact">Contact</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.room.sellerPlan">Seller Plan</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {roomList.map((room, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${room.id}`} color="link" size="sm">
                      {room.id}
                    </Button>
                  </td>
                  <td>{room.name}</td>
                  <td>{room.logoImageUrl}</td>
                  <td>{room.pincode}</td>
                  <td>{room.latitude}</td>
                  <td>{room.longitude}</td>
                  <td>{room.planExpiryDate ? <TextFormat type="date" value={room.planExpiryDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`busifrogApp.RoomStatus.${room.status}`} />
                  </td>
                  <td>{room.websiteLink}</td>
                  <td>{room.createdDate ? <TextFormat type="date" value={room.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {room.lastModifiedDate ? <TextFormat type="date" value={room.lastModifiedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{room.createdBy}</td>
                  <td>{room.lastModifiedBy}</td>
                  <td>{room.isDeleted ? 'true' : 'false'}</td>
                  <td>{room.contact ? <Link to={`contact/${room.contact.id}`}>{room.contact.id}</Link> : ''}</td>
                  <td>{room.sellerPlan ? <Link to={`seller-plan/${room.sellerPlan.id}`}>{room.sellerPlan.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${room.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${room.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${room.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="busifrogApp.room.home.notFound">No Rooms found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Room;
