import React from 'react';
import './style/dashboard.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroller';
import { Progress } from 'reactstrap';

function Dashboard(props: RouteComponentProps<{ url: string }>) {
  const { match } = props;

  return (
    <div>
      <Row className="pt-4 p-1 pl-4">
        <Col xs="12" sm="12" md="12" className="dashboard">
          <div>
            <h2 id="product-heading" data-cy="ProductHeading">
              <Row>
                <Col md="3.5" sm="auto" className="h-1 ">
                  {/* <Translate contentKey="busifrogApp.dashboard.home.title">Dashboad</Translate> */}
                  Dashboard
                </Col>
                <Col className="pt-3">
                  <Progress animated color="success " value="25">
                    Registration 25% Completed{' '}
                  </Progress>
                </Col>
                <Col md="3.4" sm="3" className=""></Col>
              </Row>
            </h2>
            <div className="table-responsive">
              <Table responsive>
                <tbody>
                  <tr /*key={`entity-${i}`}*/ data-cy="entityTable">
                    <td></td>
                    <td style={{ fontSize: '1.3rem', width: '17rem', height: '6rem', overflow: 'hidden' }}>User name</td>
                    <td style={{ fontSize: '1rem' }}>The Date</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr style={{ height: '3rem' }}>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Verification</td>
                    <td>Yet to done</td>
                    <td>Upload Company Details</td>
                    <td style={{ color: 'green' }}>
                      <FontAwesomeIcon icon="check-circle" />
                      VERIFIED
                      {/* <input type="file" style={{ width: "7rem", fontSize: ".7rem" }} /> */}
                    </td>

                    {/* <td style={{ fontSize: ".7rem" }}>Image or PDF of your company documents</td> */}
                    <td> </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Bank Verification</td>
                    <td style={{ color: 'green' }}>Completed</td>
                    <td>Upload Check Page</td>
                    <td style={{ color: 'green' }}>
                      <FontAwesomeIcon icon="check-circle" />
                      VERIFIED
                      {/* <input type="file" style={{ width: "7rem", fontSize: ".7rem" }} /> */}
                    </td>
                    {/* <td style={{ fontSize: ".7rem" }}>Image or PDF of your bank documents  </td> */}
                    <td> </td>
                  </tr>

                  <tr style={{ height: '7rem' }}>
                    <td></td>
                    <td>User Email Id</td>
                    <td>bussifrog@gmail.com</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style={{ color: 'green' }}>Status</td>
                    <td style={{ color: 'green' }}>Active</td>
                    <td>Started on</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Visitors</td>
                    <td> No:140</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>

              {/* ) : (
                !loading && (
                  <div className="alert alert-warning">
                    <Translate contentKey="busifrogApp.product.home.notFound">No Products found</Translate>
                  </div>
                ) */}
            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default Dashboard;
