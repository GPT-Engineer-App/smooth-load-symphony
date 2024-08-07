import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cat, Heart, Info, Paw, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const NavItem = ({ children, href }) => (
  <motion.a
    href={href}
    className="text-white hover:text-gray-300 transition-colors"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const CatFact = ({ fact, index }) => (
  <AccordionItem value={`item-${index}`}>
    <AccordionTrigger>Cat Fact #{index + 1}</AccordionTrigger>
    <AccordionContent>{fact}</AccordionContent>
  </AccordionItem>
);

const catBreeds = [
  { name: "Siamese", image: "https://cdn2.thecatapi.com/images/Ddq6zJm0_.jpg", description: "Vocal and social cats known for their distinctive color points." },
  { name: "Persian", image: "https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg", description: "Long-haired cats with a sweet, gentle nature." },
  { name: "Maine Coon", image: "https://cdn2.thecatapi.com/images/OOD3VXAQn.jpg", description: "Large, friendly cats with tufted ears and long, fluffy tails." },
  { name: "Bengal", image: "https://cdn2.thecatapi.com/images/O3btzLlsO.png", description: "Active, playful cats with a wild appearance." },
  { name: "Scottish Fold", image: "https://cdn2.thecatapi.com/images/o9t0LDcsa.jpg", description: "Known for their distinctive folded ears and round faces." },
];

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [catFacts, setCatFacts] = useState([]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);

  const { data: catOfTheDay } = useQuery({
    queryKey: ['catOfTheDay'],
    queryFn: async () => {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      return data[0];
    },
  });

  const fetchCatFacts = async () => {
    try {
      const facts = [];
      for (let i = 0; i < 5; i++) {
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        facts.push(data.fact);
      }
      setCatFacts(facts);
    } catch (error) {
      console.error("Error fetching cat facts:", error);
      setCatFacts(["Oops! Couldn't fetch cat facts right now. Try again later!"]);
    }
  };

  useEffect(() => {
    fetchCatFacts();
  }, []);

  const nextBreed = () => {
    setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
  };

  const prevBreed = () => {
    setCurrentBreedIndex((prevIndex) => (prevIndex - 1 + catBreeds.length) % catBreeds.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 fixed w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl font-bold flex items-center"
          >
            <Cat className="mr-2" /> CatWorld
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-x-4"
          >
            <NavItem href="#home">Home</NavItem>
            <NavItem href="#characteristics">Characteristics</NavItem>
            <NavItem href="#breeds">Breeds</NavItem>
            <NavItem href="#facts">Facts</NavItem>
          </motion.div>
        </div>
      </nav>

      <div className="flex-grow pt-16">
        <motion.div
          id="home"
          className="bg-cover bg-center h-screen flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              y,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg relative z-10"
          >
            <h1 className="text-6xl font-bold mb-4">All About Cats</h1>
            <p className="text-2xl">Discover the fascinating world of our feline friends</p>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card id="characteristics" className="md:col-span-2 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center"><Info className="mr-2" /> Characteristics of Cats</CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Independent nature</li>
                  <li>Excellent hunters with sharp claws and teeth</li>
                  <li>Flexible bodies and quick reflexes</li>
                  <li>Keen senses, especially hearing and night vision</li>
                  <li>Communicate through vocalizations, body language, and scent</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="breeds" className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center"><Paw className="mr-2" /> Cat Breed Carousel</CardTitle>
                <CardDescription>Explore different cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img
                    src={catBreeds[currentBreedIndex].image}
                    alt={catBreeds[currentBreedIndex].name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-between">
                    <Button onClick={prevBreed} variant="ghost" className="text-white bg-black bg-opacity-50 hover:bg-opacity-75">
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button onClick={nextBreed} variant="ghost" className="text-white bg-black bg-opacity-50 hover:bg-opacity-75">
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4">{catBreeds[currentBreedIndex].name}</h3>
                <p className="text-sm text-gray-600">{catBreeds[currentBreedIndex].description}</p>
              </CardContent>
            </Card>

            <Card id="facts" className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center"><Cat className="mr-2" /> Cat Facts</CardTitle>
                <CardDescription>Learn interesting facts about cats</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {catFacts.map((fact, index) => (
                    <CatFact key={index} fact={fact} index={index} />
                  ))}
                </Accordion>
                <Button onClick={fetchCatFacts} className="w-full mt-4">
                  <RefreshCw className="mr-2 h-4 w-4" /> Generate New Facts
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center"><Cat className="mr-2" /> Cat of the Day</CardTitle>
                <CardDescription>Meet today's featured feline</CardDescription>
              </CardHeader>
              <CardContent>
                {catOfTheDay ? (
                  <img
                    src={catOfTheDay.url}
                    alt="Cat of the Day"
                    className="w-full h-48 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                    Loading...
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <Button 
              onClick={() => setLikeCount(prev => prev + 1)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Heart className="mr-2" /> Like Cats ({likeCount})
            </Button>
          </motion.div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2023 CatWorld. All rights reserved.</p>
          <p className="mt-2">Made with <Heart className="inline-block text-red-500" /> for cat lovers everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
