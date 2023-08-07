import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux.hook';
import IProduct from '../../interfaces/IProduct';
import Product from './Product';
import ReactPaginate from 'react-paginate';
interface IProductsProps {
  products: Array<IProduct>;
  itemsPerPage?: number;
}

export default function Products({
  products,
  itemsPerPage = 21,
}: IProductsProps) {
  const [currPage, setCurrPage] = useState(0);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrPage(selected);
  };

  return (
    <>
      <div className="products">
        {products
          .slice(currPage * itemsPerPage, (currPage + 1) * itemsPerPage)
          .map((product) => {
            return <Product key={product.id} product={product} />;
          })}
      </div>
      <ReactPaginate
        nextLabel=">"
        nextLinkClassName="page"
        pageLinkClassName="page"
        previousLinkClassName="page"
        activeLinkClassName="active"
        containerClassName="pagination"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={
          products.length > itemsPerPage
            ? Math.ceil(products.length / itemsPerPage)
            : 0
        }
        renderOnZeroPageCount={() => null}
        previousLabel="<"
      />
    </>
  );
}
