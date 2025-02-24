
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Star, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

// Slider images pour le hero
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    title: "Collection Exclusive",
    subtitle: "Découvrez nos nouveautés"
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
    title: "Style & Élégance",
    subtitle: "Pour toutes les occasions"
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    title: "Mode Tendance",
    subtitle: "Les dernières collections"
  }
];

// Produits en vedette améliorés
const featuredProducts = [
  {
    id: 1,
    name: "Chemise Élégante",
    price: "89,99 €",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "Chemise en coton égyptien, coupe slim moderne",
    rating: 4.8,
    reviews: 156,
    colors: ["Blanc", "Bleu ciel", "Noir"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Montre Classic",
    price: "199,99 €",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Montre automatique en acier inoxydable",
    rating: 4.9,
    reviews: 230,
    features: ["Étanche 50m", "Verre saphir", "Mouvement automatique"]
  },
  {
    id: 3,
    name: "Ordinateur Portable Pro",
    price: "1299,99 €",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Ultrabook performant pour les professionnels",
    rating: 4.7,
    reviews: 189,
    specs: ["Intel i7", "16GB RAM", "512GB SSD"]
  },
];

// Composant de notation par étoiles
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

const Index = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section avec Slider */}
      <section className="relative h-[90vh] overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative h-[90vh]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-6"
                    >
                      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl text-white/90">
                        {slide.subtitle}
                      </p>
                      <Button 
                        size="lg" 
                        className="bg-white text-black hover:bg-white/90"
                      >
                        Découvrir
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Catégories */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Nos Catégories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['vetements', 'accessoires', 'electronique', 'maison'].map((category) => (
              <Link 
                to={`/category/${category}`} 
                key={category}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0" />
                <img
                  src={`https://source.unsplash.com/featured/?${category}`}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white capitalize">
                    {category}
                  </h3>
                  <p className="text-white/80 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 mt-2">
                    Découvrir <ChevronRight className="w-4 h-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produits en Vedette */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Produits en Vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
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
                    <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                    <p className="text-sm text-foreground/60 mb-3">
                      {product.description}
                    </p>
                    <StarRating rating={product.rating} reviews={product.reviews} />
                    {product.colors && (
                      <div className="mt-3 flex gap-2">
                        {product.colors.map((color) => (
                          <span key={color} className="text-sm text-foreground/60 bg-primary/10 px-2 py-1 rounded">
                            {color}
                          </span>
                        ))}
                      </div>
                    )}
                    {product.sizes && (
                      <div className="mt-3 flex gap-2">
                        {product.sizes.map((size) => (
                          <span key={size} className="text-sm text-foreground/60 border px-2 py-1 rounded">
                            {size}
                          </span>
                        ))}
                      </div>
                    )}
                    {product.features && (
                      <ul className="mt-3 space-y-1">
                        {product.features.map((feature) => (
                          <li key={feature} className="text-sm text-foreground/60 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    {product.specs && (
                      <ul className="mt-3 space-y-1">
                        {product.specs.map((spec) => (
                          <li key={spec} className="text-sm text-foreground/60 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-bold text-foreground">{product.price}</p>
                      <Button 
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => addToCart(product)}
                      >
                        Ajouter au panier
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚚",
                title: "Livraison Gratuite",
                description: "Pour toute commande supérieure à 50€"
              },
              {
                icon: "🔄",
                title: "Retours Gratuits",
                description: "30 jours pour changer d'avis"
              },
              {
                icon: "🔒",
                title: "Paiement Sécurisé",
                description: "Vos données sont protégées"
              }
            ].map((advantage) => (
              <Card key={advantage.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-foreground/60">{advantage.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
