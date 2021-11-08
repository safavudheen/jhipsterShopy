import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import sellerPlan from 'app/entities/seller-plan/seller-plan.reducer';
// prettier-ignore
import seller from 'app/entities/seller/seller.reducer';
// prettier-ignore
import contact from 'app/entities/contact/contact.reducer';
// prettier-ignore
import category from 'app/entities/category/category.reducer';
// prettier-ignore
import product from 'app/entities/product/product.reducer';
// prettier-ignore
import service from 'app/entities/service/service.reducer';
// prettier-ignore
import userVisit from 'app/entities/user-visit/user-visit.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */
import productSearch from 'app/entities/category-product-search/search-reducer';

const rootReducer = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  sellerPlan,
  seller,
  contact,
  category,
  product,
  service,
  userVisit,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
  productSearch,
};

export default rootReducer;
