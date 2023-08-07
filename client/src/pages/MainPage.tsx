import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Product from '../components/Products/Product';
import { useHttp } from '../hooks/http.hook';
import IProductDetailed from '../interfaces/IProductDetailed';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
export default function MainPage() {
  const [favorite, setFavorite] = useState<IProductDetailed[]>([]);
  const [latest, setLatest] = useState<IProductDetailed[]>([]);
  const { request, loading } = useHttp();
  const getLatest = useCallback(async (signal: AbortSignal) => {
    request<IProductDetailed[]>(
      `/products/latest`,
      'GET',
      null,
      {},
      signal,
    ).then((data) => {
      setLatest(data);
    });
  }, []);
  const getFavorite = useCallback(async (signal: AbortSignal) => {
    request<IProductDetailed[]>(
      `/products/favorite`,
      'GET',
      null,
      {},
      signal,
    ).then((data) => {
      setFavorite(data);
    });
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    getLatest(controller.signal);
    getFavorite(controller.signal);
  }, []);

  return (
    <div>
      <Link to={'/catalog'}>
        <img className="banner" src="/banners/banner-top.png"></img>
      </Link>

      {!loading && favorite.length >= 3 ? (
        <>
          <h2 style={{ margin: '20px' }}>Хит продаж</h2>
          <Slider {...settings}>
            {favorite.slice(0, 10).map((product) => {
              return (
                <Product
                  product={product}
                  key={product.id}
                  settings={{ slider: true }}
                />
              );
            })}
          </Slider>
        </>
      ) : (
        <></>
      )}

      {!loading && latest.length >= 3 ? (
        <>
          <h2 style={{ margin: '20px' }}>Новинки</h2>
          <Slider {...settings}>
            {latest.slice(0, 10).map((product) => {
              return (
                <Product
                  product={product}
                  key={product.id}
                  settings={{ slider: true }}
                />
              );
            })}
          </Slider>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
