import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table, Card, CardTitle, CardText } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from '../seller/seller.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProfileSellerDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const sellerEntity = useAppSelector(state => state.seller.entity);
  return (
    <Row className="pl-5" style={{ minHeight: '43rem' }}>
      <Col md="12">
        <h2 data-cy="sellerDetailsHeading">
          {/* <Translate contentKey="busifrogApp.seller.detail.title">Seller</Translate> */}
          Profile
        </h2>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <div>
              <img
                style={{ height: '15rem', width: '15rem', borderRadius: '174px' }}
                src="https://dynamic.brandcrowd.com/asset/logo/237115e4-e3f2-462e-b350-6368f6208c81/logo-search-grid-desktop?v=637643469951930000"
                alt=""
              />
              <h3>Your Company Name</h3>
            </div>
            <div>
              <Table style={{ marginTop: '3rem', width: '50%' }}>
                <tbody>
                  <tr>
                    <td>Bank Account Number & IFSC code</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>99989899900800000</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col>
            <Table responsive style={{ fontFamily: 'Roboto,sans-serif', fontSize: 'large' }}>
              <tbody>
                <tr>
                  <td>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </td>
                  <td>1324434355555</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <Translate contentKey="busifrogApp.seller.name">Name</Translate>
                  </td>
                  <td>name of the company</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <Translate contentKey="busifrogApp.seller.status">Status</Translate>
                  </td>
                  <td>Active</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <Translate contentKey="busifrogApp.seller.planExpiryDate">Plan Expiry Date</Translate>
                  </td>
                  <td>18/12/2021</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Plan Selected</td>
                  <td>pro</td>
                  <td></td>
                </tr>

                <tr>
                  <td>Mobile Number</td>
                  <td>73774774774</td>
                  <td></td>
                </tr>

                <tr>
                  <td>GST Number</td>
                  <td>gst36636666</td>
                  <td></td>
                </tr>
                <tr>
                  <td>PAN Number</td>
                  <td>88728787687</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>hello this is the addess of the company</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <Translate contentKey="busifrogApp.seller.contact">Contact</Translate>
                  </td>
                  <td>9877887666</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
            &nbsp;
            <Button tag={Link} to={`/profile/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
          </Col>
        </Row>
      </Col>

      <div>
        <h3 className="pt-5">Select Plan</h3>

        <Row>
          <Col sm="12" md="4" className="pt-2">
            <Card body color="info" className="text-white pt-2">
              <CardTitle tag="h5">Special Plan 1 </CardTitle>
              <CardText style={{ maxHeight: '2rem', overflow: 'hidden' }}>
                With supporting text below as a natural lead-in to additional content.
              </CardText>
              <Button outline color="primary" className="text-white">
                Choose
              </Button>
            </Card>
          </Col>
          <Col sm="12" md="4" className="text-white pt-2">
            <Card body color="warning">
              <CardTitle tag="h5">Special Plan 2 </CardTitle>
              <CardText style={{ maxHeight: '2rem', overflow: 'hidden' }}>
                With supporting text below as a natural lead-in to additional content.
              </CardText>
              <Button outline color="primary" className="text-white">
                Choose
              </Button>
            </Card>
          </Col>
          <Col sm="12" md="4" className="text-white pt-2">
            <Card body color="success">
              <CardTitle tag="h5">Special Plan 3 </CardTitle>
              <CardText style={{ maxHeight: '2rem', overflow: 'hidden' }}>
                With supporting text below as a natural lead-in to additional content.
              </CardText>
              <Button outline color="primary" className="text-white">
                Choose
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
      <Col></Col>
    </Row>
  );
};

export default ProfileSellerDetail;
