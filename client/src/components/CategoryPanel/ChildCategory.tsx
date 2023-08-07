import { Link } from 'react-router-dom';
import React from 'react';
import { IChildCategory } from '../../interfaces/ICategory';
interface ChildCategoryProps {
  category: IChildCategory;
}
export default function ChildCategory({ category }: ChildCategoryProps) {
  return (
    <Link to={`/catalog/${category.id}`} className="category">
      {category.name}
      <br />
      <span>Смотреть все {'>'}</span>
    </Link>
  );
}
