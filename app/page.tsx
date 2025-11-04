"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchInspirations, setPrompt } from "@/lib/features/artSlice";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const TextToImagePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const inspirations = useAppSelector((state) => state.art.inspirations);
  console.log("inspirations:", inspirations); 
  useEffect(() => {
    dispatch(fetchInspirations());
  }, [dispatch]);
 

  const handleCardClick = (title: string) => {
    dispatch(setPrompt(title));
    router.push("/text-to-image"); 
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">AI Art Gallery</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create awe-inspiring masterpieces effortlessly and explore the endless possibilities of AI generated art. Enter a prompt, and choose a style, AI art generator bring your ideas to life!
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {inspirations.map((inspiration) => (
            <div
              key={inspiration.id}
              onClick={() => handleCardClick(inspiration.title)}
              className="group cursor-pointer bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={inspiration.image}
                  alt={inspiration.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <p className="text-gray-200 text-sm sm:text-base line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {inspiration.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextToImagePage;
