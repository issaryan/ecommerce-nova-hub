import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Star } from 'lucide-react';

const productsByCategory: Record<string, Array<{
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}>> = {
  'vetements': [
    {
      id: 1,
      name: "Chemise Élégante",
      price: "89,99 €",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "vetements",
      description: "Chemise en coton de haute qualité, parfaite pour toutes les occasions",
      rating: 4.5,
      reviews: 128
    },
    {
      id: 4,
      name: "Pantalon Classic",
      price: "69,99 €",
      image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a",
      category: "vetements",
      description: "Pantalon confortable et élégant pour un style professionnel",
      rating: 4.2,
      reviews: 95
    },
    {
      id: 5,
      name: "Robe d'Été",
      price: "79,99 €",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      category: "vetements",
      description: "Robe légère et fluide parfaite pour les journées ensoleillées",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 6,
      name: "Veste en Cuir",
      price: "199,99 €",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      category: "vetements",
      description: "Veste en cuir véritable pour un style intemporel",
      rating: 4.7,
      reviews: 203
    }
  ],
  'accessoires': [
    {
      id: 2,
      name: "Montre Classic",
      price: "199,99 €",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      category: "accessoires",
      description: "Montre élégante avec bracelet en cuir véritable",
      rating: 4.6,
      reviews: 180
    },
    {
      id: 7,
      name: "Sac à Main",
      price: "129,99 €",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      category: "accessoires",
      description: "Sac à main en cuir synthétique avec plusieurs compartiments",
      rating: 4.3,
      reviews: 112
    },
    {
      id: 8,
      name: "Lunettes de Soleil",
      price: "89,99 €",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
      category: "accessoires",
      description: "Lunettes de soleil polarisées avec protection UV",
      rating: 4.9,
      reviews: 230
    },
    {
      id: 9,
      name: "Ceinture en Cuir",
      price: "49,99 €",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      category: "accessoires",
      description: "Ceinture en cuir véritable avec boucle en acier inoxydable",
      rating: 4.4,
      reviews: 88
    }
  ],
  'electronique': [
    {
      id: 3,
      name: "Ordinateur Portable Pro",
      price: "1299,99 €",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "electronique",
      description: "Ordinateur portable avec processeur Intel Core i7 et 16 Go de RAM",
      rating: 4.7,
      reviews: 195
    },
    {
      id: 10,
      name: "Smartphone Premium",
      price: "899,99 €",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      category: "electronique",
      description: "Smartphone avec écran OLED et caméra haute résolution",
      rating: 4.8,
      reviews: 210
    },
    {
      id: 11,
      name: "Casque Audio sans fil",
      price: "249,99 €",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "electronique",
      description: "Casque audio avec réduction de bruit et Bluetooth 5.0",
      rating: 4.5,
      reviews: 140
    },
    {
      id: 12,
      name: "Tablette Tactile",
      price: "499,99 €",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
      category: "electronique",
      description: "Tablette tactile avec écran Retina et 64 Go de stockage",
      rating: 4.6,
      reviews: 165
    }
  ],
  'maison': [
    {
      id: 13,
      name: "Lampe Design",
      price: "129,99 €",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
      category: "maison",
      description: "Lampe de table avec design moderne et éclairage LED",
      rating: 4.4,
      reviews: 100
    },
    {
      id: 14,
      name: "Coussin Décoratif",
      price: "39,99 €",
      image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db",
      category: "maison",
      description: "Coussin décoratif en coton avec motif géométrique",
      rating: 4.2,
      reviews: 75
    },
    {
      id: 15,
      name: "Vase Moderne",
      price: "59,99 €",
      image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d",
      category: "maison",
      description: "Vase en céramique avec design minimaliste",
      rating: 4.3,
      reviews: 90
    }
  ]
};

const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : star - rating <= 0.5
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-foreground/60">({reviews})</span>
    </div>
  );
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart } = useCart();
  const products = category ? productsByCategory[category] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 py-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 capitalize text-center"
        >
          Collection {category}
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      className="bg-white text-black hover:bg-white/90"
                      onClick={() => addToCart(product)}
                    >
                      Ajouter au panier
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-3">
                    {product.description}
                  </p>
                  <StarRating rating={product.rating} reviews={product.reviews} />
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-foreground">
                      {product.price}
                    </p>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => addToCart(product)}
                    >
                      Ajouter
                    </Button>
                  </div>
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
