import React, { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import ICategory, { IChildCategory } from '../../interfaces/ICategory';
import ChildCategory from './ChildCategory';
import ParentCategory from './ParentCategory';

interface CategoriesProps {
  id?: string;
}

export default function Categories({ id }: CategoriesProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [childCategories, setChildCategories] = useState<IChildCategory[]>([]);
  const [show, setShow] = useState(false);
  const { request, loading } = useHttp();
  const getCategories = async (controller: AbortController) => {
    request<ICategory[]>(
      `/categories/tree${id ? `/${id}` : ''}`,
      'GET',
      null,
      {},
      controller.signal,
    ).then((data) => {
      setCategories(data);
      setChildCategories(data[0]?.categories);
      setShow(!!data.length);
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller);
    return () => {
      controller.abort();
    };
  }, [id]);
  if (loading) {
    return <></>;
  }
  return (
    <div
      className={`${show ? 'categories' : 'hide'}`}
      onMouseLeave={() => setChildCategories([])}
    >
      <div className="parent">
        {categories.map((category) => {
          return (
            <ParentCategory
              key={category.id}
              category={category}
              setChildCategories={setChildCategories}
            />
          );
        })}
      </div>
      <div className="child">
        {childCategories.map((category) => {
          return <ChildCategory key={category.id} category={category} />;
        })}
      </div>
    </div>
  );
}
