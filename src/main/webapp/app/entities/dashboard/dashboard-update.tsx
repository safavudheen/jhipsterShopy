import React from 'react';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Dashboardupdate({ match }) {
  return (
    <Row>
      <Col md="2" className="d-none d-md-block"></Col>
      <Col xs="12" sm="12" md="10">
        <Row className="justify-content-center">
          <Col md="">
            <h2 id="busifrogApp.dashboard.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
              <Translate contentKey="busifrogApp.dashboard.home.createOrEditLabel">Edit Your Dashboard</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="" className="p-5">
            {/* {loading ? (
            <p>Loading...</p>
          ) : ( */}
            {/* <ValidatedForm 
            //  defaultValues={defaultValues()} onSubmit={saveEntity}
            > */}
            <Row>
              <Col>
                <ValidatedField
                  label={translate('busifrogApp.dashboard.companyname')}
                  id="product-name"
                  name="name"
                  data-cy="name"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                  style={{ fontSize: '.8rem' }}
                />

                <ValidatedField
                  name="username"
                  required
                  readOnly
                  // id="company-id"
                  label={translate('busifrogApp.dashboard.labelinput1')}
                  type="file"
                  validate={{ required: true }}
                  // style={{fontSize: ".8rem" ,paddingTop: "2rem"}}
                />
                <br />
                <ValidatedField
                  label={translate('busifrogApp.dashboard.labelinput2')}
                  // id="product-name"
                  name="name"
                  data-cy="name"
                  type="file"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                  style={{ fontSize: '.8rem' }}
                />
              </Col>
              <Col>
                <ValidatedField
                  label={translate('busifrogApp.dashboard.companyname')}
                  id="product-name"
                  name="name"
                  data-cy="name"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                  style={{ fontSize: '.8rem' }}
                />

                <ValidatedField
                  name="company-name"
                  required
                  // readOnly
                  // id="company-id"
                  data-cy="name"
                  label={translate('busifrogApp.dashboard.labelinput1')}
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                <br />
                <ValidatedField
                  label={translate('busifrogApp.dashboard.labelinput2')}
                  id="product-name"
                  name="name"
                  data-cy="name"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                  style={{ fontSize: '.8rem' }}
                />
              </Col>
            </Row>
            <br />
            <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/dashboard" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" /*disabled={updating}*/>
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            {/* </ValidatedForm> */}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Dashboardupdate;
