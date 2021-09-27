import React, { useState } from 'react';
import './style/sideBar.scss';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { EntitiesMenu } from '../menus';

import { values } from 'lodash';
import { entries } from 'lodash';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useHistory } from 'react-router';
import { Button, Col, Row, Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {} from '@fortawesome/fontawesome-svg-core';

import { faServer, faUserAlt, faProjectDiagram, faHandshake, faPhoneSquare, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideBar() {
  const history = useHistory();
  const [textmenu, setTextmenu] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [profile, setProfile] = useState(false);
  const [product, setProduct] = useState(false);
  const [service, setService] = useState(false);
  const [contact, setContact] = useState(false);

  const handleSidetext = e => {
    setTextmenu(!textmenu);
  };

  const handleDashboard = e => {
    setDashboard(true);
    setProfile(false);
    setProduct(false);
    setService(false);
    setContact(false);
    history.push('/dashboard');
  };

  const handleProfile = e => {
    setDashboard(false);
    setProfile(true);
    setProduct(false);
    setService(false);
    setContact(false);
    history.push('/seller');
    //profile ch
  };
  const handlePoduct = e => {
    setDashboard(false);
    setProfile(false);
    setProduct(true);
    setService(false);
    setContact(false);
    history.push('/product');
  };
  const handleService = e => {
    setDashboard(false);
    setProfile(false);
    setProduct(false);
    setService(true);
    setContact(false);

    history.push('/service');
  };
  const handleContact = e => {
    setDashboard(false);
    setProfile(false);
    setProduct(false);
    setService(false);
    setContact(true);

    history.push('/contact');
  };

  return (
    <Row>
      <Col className="d-none d-md-block">
        <div className="sideBar">
          <FontAwesomeIcon icon={faAngleRight} size="3x" className="mb-3 ml-2" onClick={handleSidetext} />

          <Table style={{ color: 'white' }}>
            <div className="icondiv-sidebar">
              <tbody>
                <tr>
                  <th onClick={handleDashboard} className={dashboard ? 'text-warning btn-sideBar' : ''}>
                    {' '}
                    <FontAwesomeIcon icon={faServer} />
                  </th>
                </tr>
                <tr>
                  <th onClick={handleProfile} className={profile ? 'text-warning btn-sideBar' : ''}>
                    <FontAwesomeIcon icon={faUserAlt} />
                  </th>
                </tr>
                <tr>
                  <th onClick={handlePoduct} className={product ? 'text-warning btn-sideBar' : ''}>
                    <FontAwesomeIcon icon={faProjectDiagram} />
                  </th>
                </tr>
                <tr>
                  <th onClick={handleService} className={service ? 'text-warning btn-sideBar' : ''}>
                    <FontAwesomeIcon icon={faHandshake} />
                  </th>
                </tr>
                <tr>
                  <th onClick={handleContact} className={contact ? 'text-warning btn-sideBar' : ''}>
                    <FontAwesomeIcon icon={faPhoneSquare} />
                  </th>
                </tr>
              </tbody>
            </div>
            {textmenu && (
              <div className="sidebar-menuname">
                <tbody>
                  <tr>
                    {/* <th > <FontAwesomeIcon icon={faServer} /></th> */}

                    <td onClick={handleDashboard} className={dashboard ? 'text-warning btn-sideBar' : ''}>
                      {' '}
                      Dashboard
                    </td>
                  </tr>
                  <tr>
                    {/* <th ><FontAwesomeIcon icon={faUserAlt} /></th> */}
                    <td onClick={handleProfile} className={profile ? 'text-warning btn-sideBar' : ''}>
                      {' '}
                      Profile
                    </td>
                  </tr>
                  <tr>
                    {/* <th ><FontAwesomeIcon icon={faProjectDiagram} /></th> */}
                    <td onClick={handlePoduct} className={product ? 'text-warning btn-sideBar' : ''}>
                      {' '}
                      Product
                    </td>
                  </tr>
                  <tr>
                    {/* <th ><FontAwesomeIcon icon={faHandshake} /></th> */}
                    <td onClick={handleService} className={service ? 'text-warning btn-sideBar' : ''}>
                      {' '}
                      Service
                    </td>
                  </tr>
                  <tr>
                    {/* <th ><FontAwesomeIcon icon={faPhoneSquare} /></th> */}
                    <td onClick={handleContact} className={contact ? 'text-warning btn-sideBar' : ''}>
                      {' '}
                      Contact
                    </td>
                  </tr>
                </tbody>
              </div>
            )}
          </Table>
        </div>
      </Col>
    </Row>
  );
}

export default SideBar;
