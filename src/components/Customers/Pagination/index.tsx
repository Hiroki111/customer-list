import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import * as qs from 'query-string';

import { Hoc, IHocProps } from 'components/Customers/Pagination/hoc';
import './styles.scss';

const Pagination = ({ totalPage, isLoadingCustomers, currentPage }: IHocProps) => {
  let history = useHistory();

  const handlePageChange = (selectedItem: { selected: number }) => {
    const keyword = qs.parse(history.location.search).keyword || '';

    // ReactPaginate counts pages from 0
    history.push(`/customers?page=${selectedItem.selected + 1}&keyword=${keyword}`);
  };

  if (isLoadingCustomers || totalPage < 1) return null;

  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={totalPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      activeClassName={'active'}
      containerClassName={'pagination'}
      onPageChange={handlePageChange}
      forcePage={currentPage - 1}
    />
  );
};

const PaginationHoc = Hoc(Pagination);

export { PaginationHoc as Pagination, Pagination as DisconnectedPagination };
