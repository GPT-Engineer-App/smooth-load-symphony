import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Cat, Heart, Info, Paw } from "lucide-react";

const NavItem = ({ children, href }) => (
  <a href={href} className="text-white hover:text-gray-300 transition-colors">
    {children}
  </a>
);

const CatFact = ({ trigger, children }) => (
  <AccordionItem value={trigger}>
    <AccordionTrigger>{trigger}</AccordionTrigger>
    <AccordionContent>{children}</AccordionContent>
  </AccordionItem>
);

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold flex items-center">
            <Cat className="mr-2" /> CatWorld
          </div>
          <div className="space-x-4">
            <NavItem href="#home">Home</NavItem>
            <NavItem href="#characteristics">Characteristics</NavItem>
            <NavItem href="#breeds">Breeds</NavItem>
            <NavItem href="#facts">Facts</NavItem>
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        <div id="home" className="bg-cover bg-center h-96 flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
          <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-5xl font-bold mb-4">All About Cats</h1>
            <p className="text-xl">Discover the fascinating world of our feline friends</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Card id="characteristics" className="md:col-span-2">
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

            <Card id="breeds">
              <CardHeader>
                <CardTitle className="flex items-center"><Paw className="mr-2" /> Popular Cat Breeds</CardTitle>
                <CardDescription>Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Siamese</li>
                  <li>Persian</li>
                  <li>Maine Coon</li>
                  <li>Bengal</li>
                  <li>Scottish Fold</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="facts">
              <CardHeader>
                <CardTitle className="flex items-center"><Cat className="mr-2" /> Interesting Cat Facts</CardTitle>
                <CardDescription>Click to reveal more about cats</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <CatFact trigger="Sleeping Habits">Cats sleep for 70% of their lives.</CatFact>
                  <CatFact trigger="Unique Noses">A cat's nose print is unique, like a human's fingerprint.</CatFact>
                  <CatFact trigger="Powerful Jump">Cats can jump up to six times their length.</CatFact>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={() => setLikeCount(prev => prev + 1)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Heart className="mr-2" /> Like Cats ({likeCount})
            </Button>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2023 CatWorld. All rights reserved.</p>
          <p className="mt-2">Made with <Heart className="inline-block text-red-500" /> for cat lovers everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
