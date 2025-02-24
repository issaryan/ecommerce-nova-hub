
import React from 'react';
import { Link } from 'react-router-dom';
import { Cart } from './Cart';

const categories = [
  { id: 'vetements', name: 'Vêtements' },
  { id: 'accessoires', name: 'Accessoires' },
  { id: 'electronique', name: 'Électronique' },
];

export const Navigation = () => {
  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl">E-Shop</Link>
          <div className="flex items-center gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <Cart />
        </div>
      </div>
    </nav>
  );
};
