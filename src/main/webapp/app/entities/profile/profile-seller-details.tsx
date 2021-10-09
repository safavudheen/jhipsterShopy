import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table, Card, CardTitle, CardText } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from '../seller/seller.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { useHistory } from 'react-router';

export const ProfileSellerDetail = (props: RouteComponentProps<{ id: string }>) => {
  const { match } = props;
  const history = useHistory();

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getEntity(props.match.params.id));
  // }, []);

  const handlePlan1 = e => {
    history.push(`${match.url}/plan1`);
  };
  const handlePlan2 = e => {
    history.push(`${match.url}/plan2`);
  };
  const handlePlan3 = e => {
    history.push(`${match.url}/plan3`);
  };
  const handlePlan4 = e => {
    history.push(`${match.url}/plan4`);
  };

  const sellerEntity = useAppSelector(state => state.seller.entity);
  return (
    <Row className="pl-5" style={{ minHeight: '43rem' }}>
      <Col md="12" className="pl-3">
        <h2 data-cy="sellerDetailsHeading">
          {/* <Translate contentKey="busifrogApp.seller.detail.title">Seller</Translate> */}
          Profile
        </h2>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <div>
              <img
                style={{ height: '10rem', width: '10rem', borderRadius: '174px' }}
                src="https://dynamic.brandcrowd.com/asset/logo/237115e4-e3f2-462e-b350-6368f6208c81/logo-search-grid-desktop?v=637643469951930000"
                alt=""
              />
              <h4>Your Company Name</h4>
            </div>
            <div>
              <Table
                style={{
                  marginTop: '3rem',
                  fontSize: '17px',
                  borderTop: 'solid',
                  borderBottom: 'solid',
                  borderRight: 'solid',
                  borderLeft: 'solid',
                  textAlign: 'initial',
                }}
              >
                <tbody>
                  <th>Company Details </th>
                  <td></td>
                  <th></th>
                  <th></th>
                  <tr>
                    <td>Company Name</td>
                    <td></td>
                    <td>Holomet</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Website link</td>
                    <td></td>
                    <td>www.holomet.com</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>GSTIN</td>
                    <td></td>
                    <td>GST55559988</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Campany Condact</td>
                    <td></td>
                    <td>99995559988</td>
                    <td> </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <Table
                style={{
                  borderColor: '#d2eaff',
                  border: '1px',
                  borderTop: 'solid',
                  borderBottom: 'solid',
                  borderRight: 'solid',
                  borderLeft: 'solid',
                  textAlign: 'initial',
                  fontSize: '13px',
                }}
              >
                <tbody>
                  <th> Bank Account Details </th>
                  <th></th>
                  <th></th>
                  <tr>
                    <td>Bank Account Number </td>
                    <td>99989899900800</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>IFSC code</td>
                    <td>cnr746775654</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Account Type</td>
                    <td>saving</td>
                    <td> </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col>
            <div>
              <Table style={{ borderColor: 'aliceblue', fontSize: '17px', border: '1px', textAlign: 'justify', padding: '1px' }}>
                <tbody>
                  <p style={{ fontWeight: 'bold' }}>About The Company </p>
                  <p style={{ padding: '1px' }}>
                    {' '}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tristique libero metus, vel suscipit neque mollis a.
                    Nam consectetur pharetra eros a egestas. Etiam faucibus, elit in ultricies bibendum, lorem massa hendrerit lorem, in
                    suscipit quam urna a lorem. Vestibulum sodales enim massa, at maximus enim volutpat vel. Duis iaculis finibus mauris,
                    quis facilisis ligula sodales ut. Vivamus aliquet massa eget eros convallis, nec vehicula libero laoreet. Donec
                    malesuada accumsan dolor, a pharetra turpis feugiat nec. Nunc at sodales diam. Nulla nibh leo, rutrum et faucibus et,
                    luctus vitae nibh. Quisque vestibulum nec nibh nec malesuada. In dignissim tempor turpis. Nunc nunc dolor, viverra nec
                    convallis vel, luctus sit amet erat. Nulla elementum elementum fermentum. Maecenas libero dolor, feugiat vel auctor et,
                    fringilla non quam. Donec velit erat, commodo eu egestas in, lobortis at mauris.
                  </p>
                </tbody>
              </Table>
            </div>
            <Table responsive style={{ fontFamily: 'Roboto,sans-serif', fontSize: 'large' }}>
              <tbody>
                {/* <tr>
                  <td>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </td>
                  <td>1324434355555</td>
                  <td></td>
                </tr> */}
                <tr>
                  <td>
                    <Translate contentKey="busifrogApp.seller.name">Name</Translate>
                  </td>
                  <td>Registed User Name</td>
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

                {/* <tr>
                  <td>GST Number</td>
                  <td>gst36636666</td>
                  <td></td>
                </tr> */}
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

      <div className="pl-4 pr-2" style={{ width: '-webkit-fill-available' }}>
        <h4 className="">Select Plan</h4>

        <Row>
          <Col sm="12" md="3" className="pt-2">
            <Card body color="info" className="text-white pt-2" style={{ textAlign: 'center' }}>
              <CardTitle tag="h5">Special Plan 1 </CardTitle>
              <CardText style={{ maxHeight: '9rem', overflow: 'hidden' }}>
                <p> Stratagy plan-1</p>
                <p> Stratagy plan-2</p>
                <p> Stratagy plan-3</p>
                <p> Stratagy plan-4</p>
                <p> Stratagy plan-5</p>
              </CardText>
              <Button color="primary" onClick={handlePlan1} className="text-white">
                Choose
              </Button>
            </Card>
          </Col>
          <Col sm="12" md="3" className="text-white pt-2">
            <Card body color="warning" style={{ textAlign: 'center' }}>
              <CardTitle tag="h5">Special Plan 2 </CardTitle>
              <CardText style={{ maxHeight: '9rem', overflow: 'hidden' }}>
                <p> Stratagy plan-1</p>
                <p> Stratagy plan-2</p>
                <p> Stratagy plan-3</p>
                <p> Stratagy plan-4</p>
                <p> Stratagy plan-5</p>
              </CardText>
              <Button color="primary" onClick={handlePlan2} className="text-white">
                Choose
              </Button>
            </Card>
          </Col>
          <Col sm="12" md="3" className="text-white pt-2">
            <Card body color="success" style={{ textAlign: 'center' }}>
              <CardTitle tag="h5">Special Plan 3 </CardTitle>
              <CardText style={{ maxHeight: '9rem', overflow: 'hidden' }}>
                <p> Stratagy plan-1</p>
                <p> Stratagy plan-2</p>
                <p> Stratagy plan-3</p>
                <p> Stratagy plan-4</p>
                <p> Stratagy plan-5</p>
              </CardText>
              <Button color="primary" onClick={handlePlan3} className="text-white">
                Choose
              </Button>
            </Card>
          </Col>
          <Col sm="12" md="3" className="text-white pt-2">
            <Card body color="info" style={{ textAlign: 'center' }}>
              <CardTitle tag="h5">Special Plan 3 </CardTitle>
              <CardText style={{ maxHeight: '9rem', overflow: 'hidden' }}>
                <p> Stratagy plan-1</p>
                <p> Stratagy plan-2</p>
                <p> Stratagy plan-3</p>
                <p> Stratagy plan-4</p>
                <p> Stratagy plan-5</p>
              </CardText>
              <Button color="primary" onClick={handlePlan4} className="text-white">
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
