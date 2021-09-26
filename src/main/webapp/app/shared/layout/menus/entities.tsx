import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/seller-plan">
      <Translate contentKey="global.menu.entities.sellerPlan" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/seller">
      <Translate contentKey="global.menu.entities.seller" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/contact">
      <Translate contentKey="global.menu.entities.contact" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      <Translate contentKey="global.menu.entities.category" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/product">
      <Translate contentKey="global.menu.entities.product" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/service">
      <Translate contentKey="global.menu.entities.service" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-visit">
      <Translate contentKey="global.menu.entities.userVisit" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
