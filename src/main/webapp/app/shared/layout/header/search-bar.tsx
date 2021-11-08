import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Col, Row } from 'reactstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { caseSearchProduct } from 'app/entities/category-product-search/search-reducer';

export const Searchbar = handleSearch => {
  // const [search, setSearch]=useState()
  // const dispatch = useAppDispatch();

  // const handleSearch =(e)=>{
  //     setSearch(e.target.value)
  // }

  //         setSearch(e.target.value)

  // console.log("kooi is",handleSearch);

  return (
    <Row>
      <Col lg="12" className="pl-4">
        <InputGroup style={{ minWidth: '40vw' }}>
          <Input placeholder="Search Your Product" />
          <InputGroupAddon addonType="append" onChange={handleSearch}>
            <Button color="success">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default Searchbar;
