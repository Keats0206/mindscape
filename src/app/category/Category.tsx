"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Generation, CategoryProps } from "@/types";
import { GenerationCard } from "@/components/GenerationCard";

export default function Category({ initialCategory }: CategoryProps) {
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