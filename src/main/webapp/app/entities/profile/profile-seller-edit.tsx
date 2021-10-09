import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { ISellerPlan } from 'app/shared/model/seller-plan.model';
import { getEntities as getSellerPlans } from 'app/entities/seller-plan/seller-plan.reducer';
import { getEntity, updateEntity, createEntity, reset } from '../seller/seller.reducer';
import { ISeller } from 'app/shared/model/seller.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProfileSellerUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(state => state.contact.entities);
  const sellerPlans = useAppSelector(state => state.sellerPlan.entities);
  const sellerEntity = useAppSelector(state => state.seller.entity);
  const loading = useAppSelector(state => state.seller.loading);
  const updating = useAppSelector(state => state.seller.updating);
  const updateSuccess = useAppSelector(state => state.seller.updateSuccess);

  const [accountNumber, setAccountNumber] = useState('');
  const updateAccountNumber = event => {
    setAccountNumber(event.target.value);
  };

  const handleClose = () => {
    props.history.push('/pofile');
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...values,
    };
    dispatch(createEntity(entity));
    // console.log(entity);
  };

  return (
    <div>
      <Row className="justify-content-center pl-5">
        <Col md="8">
          <h2 id="busifrogApp.seller.home.createOrEditLabel" data-cy="SellerCreateUpdateHeading">
            <Translate contentKey="busifrogApp.seller.home.createOrEditLabel">Create or edit a Seller</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center pl-5">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm
              // defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >
              {/* {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="seller-id"
                  label={translate("userform.form.id")}
                  validate={{ required: true }}
                />
              ) : null} */}
              <h4>Company Details</h4>
              <ValidatedField
                label={translate('userform.form.name')}
                id="seller-name"
                name="companyname"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('userform.messages.validate.name.required') },
                }}
              />
              <ValidatedField
                label={translate('userform.form.logoImage')}
                placeholder="choose file format jpg/png"
                id="seller-logoImageUrl"
                name="logoImage"
                data-cy="logoImage"
                type="file"
              />
              <ValidatedField
                label={translate('busifrogApp.seller.websiteLink')}
                id="seller-websiteLink"
                name="websiteLink"
                data-cy="websiteLink"
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
                name="gstNumber"
                label={translate('userform.form.gstnumber')}
                placeholder={translate('userform.form.gstnumber')}
                validate={{
                  required: { value: false, message: translate('userform.messages.validate.gstnumber.required') },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: translate('bankaccount.messages.validate.gstnumber.pattern'),
                  },
                  minLength: { value: 1, message: translate('bankaccount.messages.validate.gstnumber.minlength') },
                  maxLength: { value: 50, message: translate('bankaccount.messages.validate.gstnumber.maxlength') },
                }}
              />
              <ValidatedField label="Local Address of The Company" name="address" type="text" />
              <ValidatedField name="region" placeholder={translate('userform.form.region')} type="text" />
              <ValidatedField name="district" placeholder={translate('userform.form.district')} type="text" />
              <ValidatedField name="state" placeholder={translate('userform.form.state')} type="text" />
              <h4>Bank Account Details</h4>
              <ValidatedField
                name="accountnumber"
                label={translate('userform.form.account')}
                placeholder={translate('userform.form.account')}
                type="number"
                onChange={updateAccountNumber}
                validate={{
                  required: { value: true, message: translate('userform.messages.validate.account.required') },
                  minLength: { value: 4, message: translate('userform.messages.validate.account.minlength') },
                  maxLength: { value: 50, message: translate('userform.messages.validate.account.maxlength') },
                }}
              />
              <ValidatedField
                name="verifyaccountnumber"
                // label={translate('userform.form.confirmaccount')}
                placeholder={translate('userform.form.confirmaccount')}
                type="number"
                validate={{
                  required: { value: true, message: translate('userform.messages.validate.confirmaccount.required') },
                  minLength: { value: 4, message: translate('userform.messages.validate.confirmaccount.minlength') },
                  maxLength: { value: 50, message: translate('userform.messages.validate.confirmaccount.maxlength') },
                  validate: v => v === accountNumber || translate('userform.messages.validate.confirmaccount.accounterror'),
                }}
              />
              <ValidatedField
                name="ifscCode"
                label={translate('userform.form.ifsc')}
                placeholder={translate('userform.form.ifsc')}
                validate={{
                  required: { value: true, message: translate('userform.messages.validate.ifsc.required') },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: translate('useform.messages.validate.ifsc.pattern'),
                  },
                  minLength: { value: 1, message: translate('bankaccount.messages.validate.ifsc.minlength') },
                  maxLength: { value: 50, message: translate('bankaccount.messages.validate.ifsc.maxlength') },
                }}
              />
              {/* <ValidatedField
                name="pancard"
                label={translate('userform.form.pancard')}
                placeholder={translate('userform.form.pancard')}
                validate={{
                  required: { value: false, message: translate('userform.messages.validate.pancard.required') },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: translate('userform.messages.validate.login.pattern'),
                  },
                  minLength: { value: 1, message: translate('userform.messages.validate.pancard.minlength') },
                  maxLength: { value: 50, message: translate('userform.messages.validate.pancard.maxlength') },
                }}
              /> */}
              <h4>Personal Details</h4>
              <ValidatedField
                name="mobile"
                label={translate('userform.form.mobile')}
                placeholder={translate('userform.form.mobile')}
                validate={{
                  required: { value: false, message: translate('bankaccount.messages.validate.gstnumber.required') },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: translate('bankaccount.messages.validate.gstnumber.pattern'),
                  },
                  minLength: { value: 1, message: translate('bankaccount.messages.validate.gstnumber.minlength') },
                  maxLength: { value: 15, message: translate('bankaccount.messages.validate.gstnumber.maxlength') },
                }}
              />
              <ValidatedField
                name="Address"
                placeholder="Enter Your Address"
                validate={{
                  required: { value: false, message: 'address required' },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: translate('bankaccount.messages.validate.gstnumber.pattern'),
                  },
                }}
              />
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit">
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

export default ProfileSellerUpdate;
