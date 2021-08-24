import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRoom } from 'app/shared/model/room.model';
import { getEntities as getRooms } from 'app/entities/room/room.reducer';
import { getEntity, updateEntity, createEntity, reset } from './contact.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ContactUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const rooms = useAppSelector(state => state.room.entities);
  const contactEntity = useAppSelector(state => state.contact.entity);
  const loading = useAppSelector(state => state.contact.loading);
  const updating = useAppSelector(state => state.contact.updating);
  const updateSuccess = useAppSelector(state => state.contact.updateSuccess);

  const handleClose = () => {
    props.history.push('/contact');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getRooms({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    const entity = {
      ...contactEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdDate: displayDefaultDateTime(),
          lastModifiedDate: displayDefaultDateTime(),
        }
      : {
          ...contactEntity,
          createdDate: convertDateTimeFromServer(contactEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(contactEntity.lastModifiedDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="busifrogApp.contact.home.createOrEditLabel" data-cy="ContactCreateUpdateHeading">
            <Translate contentKey="busifrogApp.contact.home.createOrEditLabel">Create or edit a Contact</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="contact-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('busifrogApp.contact.firstPersonName')}
                id="contact-firstPersonName"
                name="firstPersonName"
                data-cy="firstPersonName"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.imageUrl')}
                id="contact-imageUrl"
                name="imageUrl"
                data-cy="imageUrl"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.whatsappNumber')}
                id="contact-whatsappNumber"
                name="whatsappNumber"
                data-cy="whatsappNumber"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.landlineNumber')}
                id="contact-landlineNumber"
                name="landlineNumber"
                data-cy="landlineNumber"
                type="text"
              />
              <ValidatedField label={translate('busifrogApp.contact.email')} id="contact-email" name="email" data-cy="email" type="text" />
              <ValidatedField
                label={translate('busifrogApp.contact.addressLine1')}
                id="contact-addressLine1"
                name="addressLine1"
                data-cy="addressLine1"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.addressLine2')}
                id="contact-addressLine2"
                name="addressLine2"
                data-cy="addressLine2"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.pincode')}
                id="contact-pincode"
                name="pincode"
                data-cy="pincode"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.latitude')}
                id="contact-latitude"
                name="latitude"
                data-cy="latitude"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.longitude')}
                id="contact-longitude"
                name="longitude"
                data-cy="longitude"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.createdDate')}
                id="contact-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.lastModifiedDate')}
                id="contact-lastModifiedDate"
                name="lastModifiedDate"
                data-cy="lastModifiedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.createdBy')}
                id="contact-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.lastModifiedBy')}
                id="contact-lastModifiedBy"
                name="lastModifiedBy"
                data-cy="lastModifiedBy"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.contact.isDeleted')}
                id="contact-isDeleted"
                name="isDeleted"
                data-cy="isDeleted"
                check
                type="checkbox"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/contact" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ContactUpdate;
