import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cat, Heart, Info, Paw, RefreshCw } from "lucide-react";

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

const CatFact = ({ trigger, children }) => (
  <AccordionItem value={trigger}>
    <AccordionTrigger>{trigger}</AccordionTrigger>
    <AccordionContent>{children}</AccordionContent>
  </AccordionItem>
);

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [catFact, setCatFact] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateCatFact = async () => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
      setCatFact("Oops! Couldn't fetch a cat fact right now. Try again later!");
    }
  };

  useEffect(() => {
    generateCatFact();
  }, []);

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
              y: scrollY * 0.5,
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
                <CardTitle className="flex items-center"><Paw className="mr-2" /> Cat Breed Selector</CardTitle>
                <CardDescription>Choose a cat breed to learn more</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedBreed} value={selectedBreed}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a breed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="siamese">Siamese</SelectItem>
                    <SelectItem value="persian">Persian</SelectItem>
                    <SelectItem value="maine-coon">Maine Coon</SelectItem>
                    <SelectItem value="bengal">Bengal</SelectItem>
                    <SelectItem value="scottish-fold">Scottish Fold</SelectItem>
                  </SelectContent>
                </Select>
                {selectedBreed && (
                  <div className="mt-4">
                    <img
                      src={`https://cdn2.thecatapi.com/images/${selectedBreed === 'siamese' ? 'Ddq6zJm0_.jpg' : selectedBreed === 'persian' ? 'ozEvzdVM-.jpg' : selectedBreed === 'maine-coon' ? 'OOD3VXAQn.jpg' : selectedBreed === 'bengal' ? 'O3btzLlsO.png' : 'o9t0LDcsa.jpg'}`}
                      alt={selectedBreed}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card id="facts" className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center"><Cat className="mr-2" /> Cat Fact Generator</CardTitle>
                <CardDescription>Learn interesting facts about cats</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{catFact}</p>
                <Button onClick={generateCatFact} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Generate New Fact
                </Button>
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
