import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './contact.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Contact = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const contactList = useAppSelector(state => state.contact.entities);
  const loading = useAppSelector(state => state.contact.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="contact-heading" data-cy="ContactHeading">
        <Translate contentKey="busifrogApp.contact.home.title">Contacts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="busifrogApp.contact.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="busifrogApp.contact.home.createLabel">Create new Contact</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {contactList && contactList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="busifrogApp.contact.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.firstPersonName">First Person Name</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.imageUrl">Image Url</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.whatsappNumber">Whatsapp Number</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.landlineNumber">Landline Number</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.addressLine1">Address Line 1</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.addressLine2">Address Line 2</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.pincode">Pincode</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.latitude">Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="busifrogApp.contact.longitude">Longitude</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${contact.id}`} color="link" size="sm">
                      {contact.id}
                    </Button>
                  </td>
                  <td>{contact.firstPersonName}</td>
                  <td>{contact.imageUrl}</td>
                  <td>{contact.whatsappNumber}</td>
                  <td>{contact.landlineNumber}</td>
                  <td>{contact.email}</td>
                  <td>{contact.addressLine1}</td>
                  <td>{contact.addressLine2}</td>
                  <td>{contact.pincode}</td>
                  <td>{contact.latitude}</td>
                  <td>{contact.longitude}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${contact.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contact.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contact.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="busifrogApp.contact.home.notFound">No Contacts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Contact;
