import React from 'react';
import ReactPaginate from 'react-paginate';
import { Hoc, IHocProps } from 'components/Customers/Pagination/hoc';
import './styles.scss';

const Pagination = ({ handlePageClick, totalPage, isLoadingCustomers, currentPage }: IHocProps) => {
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
      /* ReactPaginate counts pages from 0 */
      onPageChange={(selectedItem: { selected: number }) => handlePageClick(selectedItem.selected + 1)}
      forcePage={currentPage - 1}
    />
  );
};

const PaginationHoc = Hoc(Pagination);

export { PaginationHoc as Pagination, Pagination as DisconnectedPagination };
