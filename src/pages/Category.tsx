import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

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
    {
      id: 5,
      name: "Robe d'Été",
      price: "79,99 €",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      category: "vetements"
    },
    {
      id: 6,
      name: "Veste en Cuir",
      price: "199,99 €",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      category: "vetements"
    }
  ],
  'accessoires': [
    {
      id: 2,
      name: "Montre Classic",
      price: "199,99 €",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      category: "accessoires"
    },
    {
      id: 7,
      name: "Sac à Main",
      price: "129,99 €",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      category: "accessoires"
    },
    {
      id: 8,
      name: "Lunettes de Soleil",
      price: "89,99 €",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
      category: "accessoires"
    },
    {
      id: 9,
      name: "Ceinture en Cuir",
      price: "49,99 €",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      category: "accessoires"
    }
  ],
  'electronique': [
    {
      id: 3,
      name: "Ordinateur Portable Pro",
      price: "1299,99 €",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "electronique"
    },
    {
      id: 10,
      name: "Smartphone Premium",
      price: "899,99 €",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      category: "electronique"
    },
    {
      id: 11,
      name: "Casque Audio sans fil",
      price: "249,99 €",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "electronique"
    },
    {
      id: 12,
      name: "Tablette Tactile",
      price: "499,99 €",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
      category: "electronique"
    }
  ],
  'maison': [
    {
      id: 13,
      name: "Lampe Design",
      price: "129,99 €",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
      category: "maison"
    },
    {
      id: 14,
      name: "Coussin Décoratif",
      price: "39,99 €",
      image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db",
      category: "maison"
    },
    {
      id: 15,
      name: "Vase Moderne",
      price: "59,99 €",
      image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d",
      category: "maison"
    }
  ]
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
