import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import Categories from '../components/CategoryPanel/Categories';
import Loader from '../components/Loader';
import { useHttp } from '../hooks/http.hook';
import IProduct from '../interfaces/IProduct';
import ICategoryQuery from '../interfaces/ICategoryQuery';
import Products from '../components/Products/Products';

export default function CatalogPage() {
  const { request, loading } = useHttp();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [name, setName] = useState<string>('Каталог');
  const id = useParams().id;
  const getCategories = useCallback(
    async (controller: AbortController) => {
      request<ICategoryQuery>(
        `/categories${id ? `/${id}` : ''}`,
        'GET',
        null,
        {},
        controller.signal,
      ).then((data) => {
        setProducts(data.products);
        setName(data.name);
      });
    },
    [id],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (id) {
      getCategories(controller);
    } else {
      setProducts([]);
      setName('Каталог');
    }
    return () => {
      controller.abort();
    };
  }, [id]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="catalog-page">
      <h1>{name}</h1>
      <Categories id={id} />
      {products.length ? (
        <Products products={products} />
      ) : (
        <img className="banner" src="/banners/banner-bottom.png"></img>
      )}
    </div>
  );
}
