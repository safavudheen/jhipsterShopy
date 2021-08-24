import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { ISellerPlan } from 'app/shared/model/seller-plan.model';
import { getEntities as getSellerPlans } from 'app/entities/seller-plan/seller-plan.reducer';
import { getEntity, updateEntity, createEntity, reset } from './room.reducer';
import { IRoom } from 'app/shared/model/room.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const RoomUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const contacts = useAppSelector(state => state.contact.entities);
  const sellerPlans = useAppSelector(state => state.sellerPlan.entities);
  const roomEntity = useAppSelector(state => state.room.entity);
  const loading = useAppSelector(state => state.room.loading);
  const updating = useAppSelector(state => state.room.updating);
  const updateSuccess = useAppSelector(state => state.room.updateSuccess);

  const handleClose = () => {
    props.history.push('/room');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getContacts({}));
    dispatch(getSellerPlans({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.planExpiryDate = convertDateTimeToServer(values.planExpiryDate);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    const entity = {
      ...roomEntity,
      ...values,
      contact: contacts.find(it => it.id.toString() === values.contactId.toString()),
      sellerPlan: sellerPlans.find(it => it.id.toString() === values.sellerPlanId.toString()),
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
          planExpiryDate: displayDefaultDateTime(),
          createdDate: displayDefaultDateTime(),
          lastModifiedDate: displayDefaultDateTime(),
        }
      : {
          ...roomEntity,
          planExpiryDate: convertDateTimeFromServer(roomEntity.planExpiryDate),
          status: 'INACTIVE',
          createdDate: convertDateTimeFromServer(roomEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(roomEntity.lastModifiedDate),
          contactId: roomEntity?.contact?.id,
          sellerPlanId: roomEntity?.sellerPlan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="busifrogApp.room.home.createOrEditLabel" data-cy="RoomCreateUpdateHeading">
            <Translate contentKey="busifrogApp.room.home.createOrEditLabel">Create or edit a Room</Translate>
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
                  id="room-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('busifrogApp.room.name')}
                id="room-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('busifrogApp.room.logoImageUrl')}
                id="room-logoImageUrl"
                name="logoImageUrl"
                data-cy="logoImageUrl"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.room.pincode')}
                id="room-pincode"
                name="pincode"
                data-cy="pincode"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.room.latitude')}
                id="room-latitude"
                name="latitude"
                data-cy="latitude"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.room.longitude')}
                id="room-longitude"
                name="longitude"
                data-cy="longitude"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.room.planExpiryDate')}
                id="room-planExpiryDate"
                name="planExpiryDate"
                data-cy="planExpiryDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label={translate('busifrogApp.room.status')} id="room-status" name="status" data-cy="status" type="select">
                <option value="INACTIVE">{translate('busifrogApp.RoomStatus.INACTIVE')}</option>
                <option value="VERIFIED">{translate('busifrogApp.RoomStatus.VERIFIED')}</option>
              </ValidatedField>
              <ValidatedField
                label={translate('busifrogApp.room.websiteLink')}
                id="room-websiteLink"
                name="websiteLink"
                data-cy="websiteLink"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.room.createdDate')}
                id="room-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('busifrogApp.room.lastModifiedDate')}
                id="room-lastModifiedDate"
                name="lastModifiedDate"
                data-cy="lastModifiedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('busifrogApp.room.createdBy')}
                id="room-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.room.lastModifiedBy')}
                id="room-lastModifiedBy"
                name="lastModifiedBy"
                data-cy="lastModifiedBy"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.room.isDeleted')}
                id="room-isDeleted"
                name="isDeleted"
                data-cy="isDeleted"
                check
                type="checkbox"
              />
              <ValidatedField
                id="room-contact"
                name="contactId"
                data-cy="contact"
                label={translate('busifrogApp.room.contact')}
                type="select"
              >
                <option value="" key="0" />
                {contacts
                  ? contacts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="room-sellerPlan"
                name="sellerPlanId"
                data-cy="sellerPlan"
                label={translate('busifrogApp.room.sellerPlan')}
                type="select"
              >
                <option value="" key="0" />
                {sellerPlans
                  ? sellerPlans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/room" replace color="info">
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

export default RoomUpdate;
