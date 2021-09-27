import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { ISellerPlan } from 'app/shared/model/seller-plan.model';
import { getEntities as getSellerPlans } from 'app/entities/seller-plan/seller-plan.reducer';
import { getEntity, updateEntity, createEntity, reset } from './seller.reducer';
import { ISeller } from 'app/shared/model/seller.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SellerUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const contacts = useAppSelector(state => state.contact.entities);
  const sellerPlans = useAppSelector(state => state.sellerPlan.entities);
  const sellerEntity = useAppSelector(state => state.seller.entity);
  const loading = useAppSelector(state => state.seller.loading);
  const updating = useAppSelector(state => state.seller.updating);
  const updateSuccess = useAppSelector(state => state.seller.updateSuccess);

  const handleClose = () => {
    props.history.push('/seller');
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
      ...sellerEntity,
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
          ...sellerEntity,
          planExpiryDate: convertDateTimeFromServer(sellerEntity.planExpiryDate),
          status: 'INACTIVE',
          createdDate: convertDateTimeFromServer(sellerEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(sellerEntity.lastModifiedDate),
          contactId: sellerEntity?.contact?.id,
          sellerPlanId: sellerEntity?.sellerPlan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="busifrogApp.seller.home.createOrEditLabel" data-cy="SellerCreateUpdateHeading">
            <Translate contentKey="busifrogApp.seller.home.createOrEditLabel">Create or edit a Seller</Translate>
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
                  id="seller-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('busifrogApp.seller.name')}
                id="seller-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('busifrogApp.seller.logoImageUrl')}
                id="seller-logoImageUrl"
                name="logoImageUrl"
                data-cy="logoImageUrl"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.seller.pincode')}
                id="seller-pincode"
                name="pincode"
                data-cy="pincode"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.seller.latitude')}
                id="seller-latitude"
                name="latitude"
                data-cy="latitude"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.seller.longitude')}
                id="seller-longitude"
                name="longitude"
                data-cy="longitude"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.seller.planExpiryDate')}
                id="seller-planExpiryDate"
                name="planExpiryDate"
                data-cy="planExpiryDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('busifrogApp.seller.status')}
                id="seller-status"
                name="status"
                data-cy="status"
                type="select"
              >
                <option value="INACTIVE">{translate('busifrogApp.SellerStatus.INACTIVE')}</option>
                <option value="VERIFIED">{translate('busifrogApp.SellerStatus.VERIFIED')}</option>
              </ValidatedField>
              <ValidatedField
                label={translate('busifrogApp.seller.websiteLink')}
                id="seller-websiteLink"
                name="websiteLink"
                data-cy="websiteLink"
                type="text"
              />
              <ValidatedField
                id="seller-contact"
                name="contactId"
                data-cy="contact"
                label={translate('busifrogApp.seller.contact')}
                type="select"
              >
                <option value="" key="0" />
                {contacts
                  ? contacts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.firstPersonName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="seller-sellerPlan"
                name="sellerPlanId"
                data-cy="sellerPlan"
                label={translate('busifrogApp.seller.sellerPlan')}
                type="select"
              >
                <option value="" key="0" />
                {sellerPlans
                  ? sellerPlans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/seller" replace color="info">
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

export default SellerUpdate;
