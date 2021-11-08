import React from 'react';
import CategoryProductSearch from './Category-product-search-view';
import AllCategoryBtnDiv from './All-Category-BtnDiv';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const searchProductCategory = () => {
  return (
    <div>
      <ErrorBoundary>
        <AllCategoryBtnDiv />
        <CategoryProductSearch />
      </ErrorBoundary>
    </div>
  );
};

export default searchProductCategory;
