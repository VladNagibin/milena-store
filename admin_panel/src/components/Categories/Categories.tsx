import React from 'react';
import ICategory from '../../interfaces/ICategory';
import Category from './Category';
interface ICategoriesProps {
  categories: ICategory[];
  reRender: () => void;
}

export default function Categories({ categories, reRender }: ICategoriesProps) {
  return (
    <div>
      {categories.length &&
        categories.map((category) => {
          return (
            <Category
              category={category}
              key={category.id}
              reRender={reRender}
            />
          );
        })}
    </div>
  );
}
