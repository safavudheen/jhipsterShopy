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
import {  } from '@fortawesome/fontawesome-svg-core';

import { faServer,faUserAlt,faProjectDiagram,faservice } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideBar() {
  const history = useHistory();

  const [dashboard, setDashboard] = useState(false);
  const [profile, setProfile] = useState(false);
  const [product, setProduct] = useState(false);
  const [service, setService] = useState(false);
  const [contact, setContact] = useState(false);

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
    history.push('/profile');
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
          <Nav vertical>
            {/* <NavItem>
              <NavLink onClick={handleDashboard} className={dashboard ? 'text-warning btn-sideBar' : ''}>
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleProfile} className={profile ? 'text-warning btn-sideBar' : ''}>
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handlePoduct} className={product ? 'text-warning btn-sideBar' : ''}>
                Product
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleService} className={service ? 'text-warning btn-sideBar' : ''}>
                Service
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleContact} className={contact ? 'text-warning btn-sideBar' : ''}>
                Contact
              </NavLink>
              
            </NavItem> */}
            {/* <i class="fab fa-dashcube"></i> */}
       <FontAwesomeIcon icon="angle-right" />
       {/* <i class="fas fa-angle-right"></i> */}
       <Table style={{color: "white"}}>
     
      <tbody>
        <tr>
           
          <th > <FontAwesomeIcon icon={faServer} /></th>
      
          <td> Dashboard</td>
        </tr>
        <tr>
          <th ><FontAwesomeIcon icon={faUserAlt} /></th>
          <td> Profile</td>

        </tr>
        <tr>
          <th ><FontAwesomeIcon icon={faProjectDiagram} /></th>
          <td> Product</td>
        </tr>
        <tr>
          <th ><FontAwesomeIcon icon={faServer} /></th>
          <td> Service</td>
        </tr>
        <tr>
          <th ><FontAwesomeIcon icon={faServer} /></th>
         <td> Contact</td>

        </tr>
               
      </tbody>
      
    </Table>
   
   
          </Nav>
        </div>
      </Col>
    </Row>
  );
}

export default SideBar;
