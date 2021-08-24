import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './seller-plan.reducer';
import { ISellerPlan } from 'app/shared/model/seller-plan.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SellerPlanUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const sellerPlanEntity = useAppSelector(state => state.sellerPlan.entity);
  const loading = useAppSelector(state => state.sellerPlan.loading);
  const updating = useAppSelector(state => state.sellerPlan.updating);
  const updateSuccess = useAppSelector(state => state.sellerPlan.updateSuccess);

  const handleClose = () => {
    props.history.push('/seller-plan');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
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
      ...sellerPlanEntity,
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
          ...sellerPlanEntity,
          createdDate: convertDateTimeFromServer(sellerPlanEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(sellerPlanEntity.lastModifiedDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="busifrogApp.sellerPlan.home.createOrEditLabel" data-cy="SellerPlanCreateUpdateHeading">
            <Translate contentKey="busifrogApp.sellerPlan.home.createOrEditLabel">Create or edit a SellerPlan</Translate>
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
                  id="seller-plan-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.name')}
                id="seller-plan-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.products')}
                id="seller-plan-products"
                name="products"
                data-cy="products"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.services')}
                id="seller-plan-services"
                name="services"
                data-cy="services"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.monthlyPrice')}
                id="seller-plan-monthlyPrice"
                name="monthlyPrice"
                data-cy="monthlyPrice"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.annualPrice')}
                id="seller-plan-annualPrice"
                name="annualPrice"
                data-cy="annualPrice"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.discount')}
                id="seller-plan-discount"
                name="discount"
                data-cy="discount"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.createdDate')}
                id="seller-plan-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.lastModifiedDate')}
                id="seller-plan-lastModifiedDate"
                name="lastModifiedDate"
                data-cy="lastModifiedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.createdBy')}
                id="seller-plan-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.lastModifiedBy')}
                id="seller-plan-lastModifiedBy"
                name="lastModifiedBy"
                data-cy="lastModifiedBy"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.sellerPlan.isDeleted')}
                id="seller-plan-isDeleted"
                name="isDeleted"
                data-cy="isDeleted"
                check
                type="checkbox"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/seller-plan" replace color="info">
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

export default SellerPlanUpdate;
