import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { ISeller } from 'app/shared/model/seller.model';
import { getEntities as getSellers } from 'app/entities/seller/seller.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import './Style/product-update.scss';

export const ProductUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const categories = useAppSelector(state => state.category.entities);
  const sellers = useAppSelector(state => state.seller.entities);
  const productEntity = useAppSelector(state => state.product.entity);
  const loading = useAppSelector(state => state.product.loading);
  const updating = useAppSelector(state => state.product.updating);
  const updateSuccess = useAppSelector(state => state.product.updateSuccess);

  const handleClose = () => {
    props.history.push('/product');
  };

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  console.log(image3);

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
      ...productEntity,
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

  //----------------------
  const handleImage1 = e => {
    setImage1(e.target.files[0]);
  };

  const handleImage2 = e => {
    setImage2(e.target.files[0]);
  };

  const handleImage3 = e => {
    setImage3(e.target.files[0]);
  };

  const defaultValues = () =>
    isNew
      ? {
          createdDate: displayDefaultDateTime(),
          lastModifiedDate: displayDefaultDateTime(),
        }
      : {
          ...productEntity,
          createdDate: convertDateTimeFromServer(productEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(productEntity.lastModifiedDate),
          categoryId: productEntity?.category?.id,
          sellerId: productEntity?.seller?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="busifrogApp.product.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
            <Translate contentKey="busifrogApp.product.home.createOrEditLabel">Create or edit a Product</Translate>
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
                  id="product-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('busifrogApp.product.name')}
                placeholder="Name of the Product"
                id="product-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField label={translate('busifrogApp.product.code')} id="product-code" name="code" data-cy="code" type="text" />
              {/* <ValidatedField
                label={translate('busifrogApp.product.filePath')}
                id="product-filePath"
                name="filePath"
                data-cy="filePath"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              /> */}
              {/* <ValidatedField
                label={translate('busifrogApp.product.fileType')}
                id="product-fileType"
                name="fileType"
                data-cy="fileType"
                type="text"
              /> */}
              {/* <ValidatedField
                label={translate('busifrogApp.product.shortDescription')}
                id="product-shortDescription"
                name="shortDescription"
                data-cy="shortDescription"
                type="text"
              /> */}
              <ValidatedField name="price" label="Price Of The Product" type="number" required />
              <ValidatedField
                id="product-category"
                name="categoryId"
                data-cy="category"
                label={translate('busifrogApp.product.category')}
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
              <ValidatedField placeholder="Brand Name" name="brand" label="The Product Brand" type="number" required />
              <ValidatedField
                label={translate('busifrogApp.product.description')}
                id="product-description"
                name="description"
                data-cy="description"
                type="textarea"
              />
              <h4>Upload Image of The Product</h4>
              <Row style={{}}>
                <Col>
                  <img className="upload_image_div" src={image1 ? URL.createObjectURL(image1) : ''} alt="" />
                  <ValidatedField
                    label="first image"
                    id="product-description"
                    name="product_image_1"
                    type="file"
                    required
                    onChange={handleImage1}
                  />
                </Col>
                <Col>
                  <img className="upload_image_div" src={image2 ? URL.createObjectURL(image2) : ''} alt="" />

                  <ValidatedField
                    label="second image"
                    id="product-description"
                    name="product_image_2"
                    type="file"
                    required
                    onChange={handleImage2}
                  />
                </Col>
                <Col>
                  <img className="upload_image_div" src={image3 ? URL.createObjectURL(image3) : ''} alt="" />

                  <ValidatedField
                    label="third image"
                    id="product-description"
                    name="Product_image_3"
                    type="file"
                    required
                    onChange={handleImage3}
                  />
                </Col>
              </Row>
              {/* <ValidatedField
                label={translate('busifrogApp.product.externalLink')}
                id="product-externalLink"
                name="externalLink"
                data-cy="externalLink"
                type="textarea"
              /> */}
              {/* <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText> */}
              {/* <ValidatedField
                id="product-seller"
                name="sellerId"
                data-cy="seller"
                label={translate('busifrogApp.product.seller')}
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
              </ValidatedField> */}
              {/* <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText> */}
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/product" replace color="info">
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

export default ProductUpdate;
