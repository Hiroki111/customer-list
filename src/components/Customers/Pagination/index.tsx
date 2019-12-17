import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Hoc, IHocProps } from 'components/Customers/Pagination/hoc';
import './styles.scss';

const Pagination = ({ fetchCustomers, totalPage, isLoadingCustomers, currentPage }: IHocProps) => {
  let history = useHistory();

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
      onPageChange={(selectedItem: { selected: number }) =>
        history.push(`/customers?page=${selectedItem.selected + 1}`)
      }
      forcePage={currentPage - 1}
    />
  );
};

const PaginationHoc = Hoc(Pagination);

export { PaginationHoc as Pagination, Pagination as DisconnectedPagination };
