import React from 'react';

import { Button, Row, Col, Table, Card, CardTitle, CardText } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import './style/package-plan.scss';

export const PackagePlan3 = (props: RouteComponentProps<{ id: string }>) => {
  return (
    <div>
      <Row className="pl-5" style={{ minHeight: '30rem' }}>
        <Col md="12" className="pl-3">
          <Row>
            <Col lg="4" md="4" hidden-xs hidden-sm></Col>
            <Col md="4" lg="4" sm="12">
              <div className="select_plan_heading">
                <h3 className="select_plan_heading text-success p-4">Choose Package Plan 3</h3>
              </div>
              <div className="package_plan_card">
                <Card body inverse color="success" className="plan_card" style={{ textAlign: 'center' }}>
                  <CardTitle tag="h4">Green Package</CardTitle>
                  <CardText>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </CardText>
                  <Button color="secondary">Take This Plan</Button>
                </Card>
              </div>
            </Col>
            <Col lg="4" md="4" hidden-xs hidden-sm></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PackagePlan3;
