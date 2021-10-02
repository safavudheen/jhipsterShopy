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

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const contacts = useAppSelector(state => state.contact.entities);
  const sellerPlans = useAppSelector(state => state.sellerPlan.entities);
  const sellerEntity = useAppSelector(state => state.seller.entity);
  const loading = useAppSelector(state => state.seller.loading);
  const updating = useAppSelector(state => state.seller.updating);
  const updateSuccess = useAppSelector(state => state.seller.updateSuccess);

  const [accountNumber, setAccountNumber] = useState('');
  // const [verify,setVerify] = useState("")
  // const [donotmatch, setDonotmatch] = useState(false)
  const updateAccountNumber = event => {
    setAccountNumber(event.target.value);
  };
  // const verfyAccountNumber=((event)=>{setVerify(event.target.value)});

  const handleClose = () => {
    props.history.push('/pofile');
  };

  // if(accountNumber === verify){
  //   setDonotmatch(true)
  // }else{
  //   setDonotmatch(false)
  // }

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
    const entity = {
      ...values,
    };
    dispatch(createEntity(entity));
    // console.log(entity);
  };

  // const saveEntity = ({ companyname, logoImageUrl, pincode, websiteLink, address, state, district, region,firstAccountnumber,ifscCode, pancard, gstnumber,mobile }) => {
  //   dispatch(updateProfileEntity({ companyname, logoImageUrl, pincode, websiteLink, address, state, district, region,firstAccountnumber,ifscCode, pancard, gstnumber,mobile} ))
  // }

  // const saveEntity = values => {
  //   values.planExpiryDate = convertDateTimeToServer(values.planExpiryDate);
  //   values.createdDate = convertDateTimeToServer(values.createdDate);
  //   values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

  //   const entity = {
  //     ...sellerEntity,
  //     ...values,
  //     contact: contacts.find(it => it.id.toString() === values.contactId.toString()),
  //     sellerPlan: sellerPlans.find(it => it.id.toString() === values.sellerPlanId.toString()),
  //   };

  //   if (isNew) {
  //     dispatch(createEntity(entity));
  //   } else {+
  //     dispatch(updateProfileEntity(entity));
  //   }
  // };

  // const defaultValues = () =>
  //   isNew
  //     ? {
  //         planExpiryDate: displayDefaultDateTime(),
  //         createdDate: displayDefaultDateTime(),
  //         lastModifiedDate: displayDefaultDateTime(),
  //       }
  //     : {
  //         ...sellerEntity,
  //         planExpiryDate: convertDateTimeFromServer(sellerEntity.planExpiryDate),
  //         status: 'INACTIVE',
  //         createdDate: convertDateTimeFromServer(sellerEntity.createdDate),
  //         lastModifiedDate: convertDateTimeFromServer(sellerEntity.lastModifiedDate),
  //         contactId: sellerEntity?.contact?.id,
  //         sellerPlanId: sellerEntity?.sellerPlan?.id,
  //       };

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
              <ValidatedField label="Address of The Company" name="address" type="text" />
              <ValidatedField name="region" placeholder={translate('userform.form.region')} type="text" />
              <ValidatedField name="district" placeholder={translate('userform.form.district')} type="text" />
              <ValidatedField
                // label="State"
                name="state"
                placeholder={translate('userform.form.state')}
                type="text"
              />
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
                label={translate('userform.form.confirmaccount')}
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
              <ValidatedField
                name="pancard"
                label={translate('userform.form.pancard')}
                placeholder={translate('userform.form.pancard')}
                validate={{
                  required: { value: true, message: translate('userform.messages.validate.pancard.required') },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: translate('userform.messages.validate.login.pattern'),
                  },
                  minLength: { value: 1, message: translate('userform.messages.validate.pancard.minlength') },
                  maxLength: { value: 50, message: translate('userform.messages.validate.pancard.maxlength') },
                }}
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
              {/* <ValidatedField
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
              </ValidatedField> */}
              {/* <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/seller" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button> */}
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
