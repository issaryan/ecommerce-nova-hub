
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

// Simulation de données des produits par catégorie
const productsByCategory: Record<string, Array<{
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}>> = {
  'vetements': [
    {
      id: 1,
      name: "Chemise Élégante",
      price: "89,99 €",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "vetements"
    },
    {
      id: 4,
      name: "Pantalon Classic",
      price: "69,99 €",
      image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a",
      category: "vetements"
    },
  ],
  'accessoires': [
    {
      id: 2,
      name: "Montre Classic",
      price: "199,99 €",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      category: "accessoires"
    },
  ],
  'electronique': [
    {
      id: 3,
      name: "Ordinateur Portable Pro",
      price: "1299,99 €",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "electronique"
    },
  ],
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart } = useCart();
  const products = category ? productsByCategory[category] || [] : [];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 capitalize">{category}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-foreground/60">{product.price}</p>
                  <Button 
                    className="w-full mt-4 bg-primary hover:bg-primary/90"
                    onClick={() => addToCart(product)}
                  >
                    Ajouter au panier
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
