import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { ISeller } from 'app/shared/model/seller.model';
import { getEntities as getSellers } from 'app/entities/seller/seller.reducer';
import { getEntity, updateEntity, createEntity, reset } from './service.reducer';
import { IService } from 'app/shared/model/service.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ServiceUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const categories = useAppSelector(state => state.category.entities);
  const sellers = useAppSelector(state => state.seller.entities);
  const serviceEntity = useAppSelector(state => state.service.entity);
  const loading = useAppSelector(state => state.service.loading);
  const updating = useAppSelector(state => state.service.updating);
  const updateSuccess = useAppSelector(state => state.service.updateSuccess);

  const handleClose = () => {
    props.history.push('/service');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCategories({}));
    dispatch(getSellers({}));
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
      ...serviceEntity,
      ...values,
      category: categories.find(it => it.id.toString() === values.categoryId.toString()),
      seller: sellers.find(it => it.id.toString() === values.sellerId.toString()),
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
          ...serviceEntity,
          createdDate: convertDateTimeFromServer(serviceEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(serviceEntity.lastModifiedDate),
          categoryId: serviceEntity?.category?.id,
          sellerId: serviceEntity?.seller?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="busifrogApp.service.home.createOrEditLabel" data-cy="ServiceCreateUpdateHeading">
            <Translate contentKey="busifrogApp.service.home.createOrEditLabel">Create or edit a Service</Translate>
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
                  id="service-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('busifrogApp.service.name')}
                id="service-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField label={translate('busifrogApp.service.code')} id="service-code" name="code" data-cy="code" type="text" />
              <ValidatedField
                label={translate('busifrogApp.service.imageUrl')}
                id="service-imageUrl"
                name="imageUrl"
                data-cy="imageUrl"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.service.shortDescription')}
                id="service-shortDescription"
                name="shortDescription"
                data-cy="shortDescription"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.service.description')}
                id="service-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('busifrogApp.service.externalLink')}
                id="service-externalLink"
                name="externalLink"
                data-cy="externalLink"
                type="text"
              />
              <ValidatedField
                id="service-category"
                name="categoryId"
                data-cy="category"
                label={translate('busifrogApp.service.category')}
                type="select"
                required
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="service-seller"
                name="sellerId"
                data-cy="seller"
                label={translate('busifrogApp.service.seller')}
                type="select"
                required
              >
                <option value="" key="0" />
                {sellers
                  ? sellers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/service" replace color="info">
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

export default ServiceUpdate;
