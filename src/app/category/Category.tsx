"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Card, 
  CardHeader, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { supabase } from "@/utils/supabase/client";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

export interface Generation {
  id: string;
  user_id: string;
  type: 'image' | 'video';
  prompt: string;
  result_url: string;
  model_used: string;
  is_public: boolean;
  created_at: string;
  tags: string[];
}

interface CategoryProps {
  initialCategory?: string;
}

export default function CategoryProps({ initialCategory }: CategoryProps) {
  const router = useRouter();
  const [category] = useState(initialCategory?.replace('-', ' ') || '');
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("generations") // Correct table name
          .select("*")
          .eq("is_public", true)
          .contains('tags', [category]); // Use contains for array search

        if (error) throw error;

        setGenerations(data || []);
        console.log("Fetched generations:", data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load generations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, router]);

  if (loading) {
    return (
      <div className="min-h-screen text-xs text-gray-500 w-screen h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-xs text-red-500 w-screen h-full flex justify-center items-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-12 w-screen flex flex-col space-y-4 min-h-screen">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/explore">Explore</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/explore?category=${category?.replace(' ', '-')}`} className="uppercase">
              {category}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="uppercase text-5xl font-bold pt-2 pb-6">#{category?.replace(' ', '-')}</div>
      {generations.length === 0 ? (
        <div className="text-center text-gray-500">No generations found for this category.</div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {generations.map((item) => (
            <GenerationCard key={item.id} generation={item} />
          ))}
        </div>
      )}
    </div>
  );
}

const GenerationCard = ({ generation }: { generation: Generation }) => {
  const [didCopy, setDidCopy] = useState(false);

  function handleCopy(prompt: string) {
    navigator.clipboard.writeText(prompt);
    setDidCopy(true);
    setTimeout(() => {
      setDidCopy(false);
    }, 2000);
  }

  return (
    <Card key={generation.id} className="flex flex-col justify-between overflow-hidden transition-transform duration-300">
              <CardHeader className="p-0">
                <Image
                  src={generation.result_url || "/decor.png"}
                  alt={generation.prompt}
                  width={600}
                  height={200}
                  className="object-cover overflow-hidden"
                />
                <CardDescription className="px-4 py-2 pb-4 flex flex-col">
                  <div className="text-gray-500 font-bold pb-1">Prompt:</div>
                  {generation.prompt}
                  </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 flex flex-wrap px-2 gap-1 pb-2">
                <Button className="w-full" variant="outline" onClick={() => {
                  handleCopy(generation.prompt);
                }}>
                  <CopyIcon className="mr-2" size={16}/>
                  {didCopy ? 'Copied!' : 'Copy Prompt'}
                </Button>
              </CardContent>
            </Card>
  );
}