import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Products from '../components/Products/Products';
import IProduct from '../interfaces/IProduct';
import AddProducts from '../components/Products/AddProducts';
import { serverURL } from '../auth';

export default function CatalogPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [name, setName] = useState('Каталог');
  const id = useParams().id;
  const getProducts = () => {
    fetch(`${serverURL}/categories${id ? `/${id}` : ''}`).then((response) => {
      response
        .json()
        .then((data: { id: number; name: string; products: IProduct[] }) => {
          setProducts(data.products);
          setName(data.name);
        });
    });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <h1>{name}</h1>
      <AddProducts id={Number(id)} reRender={getProducts} />
      {products.length ? (
        <Products products={products} reRender={getProducts} />
      ) : (
        <div className="no-products">
          <h2>Товаров в этой категории нет</h2>
          <span className="material-symbols-outlined">
            sentiment_dissatisfied
          </span>
        </div>
      )}
    </div>
  );
}
