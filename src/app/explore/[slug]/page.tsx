"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Generation, Category as CategoryType } from "@/types";
import { GenerationCard } from "@/components/GenerationCard";
import CategoryCard from "@/components/CategoryCard";
import { featuredTags } from "@/data/categoryTags";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Category() {
  const router = useRouter();
  const params = useParams();
  const [category, setCategory] = useState<string>('');
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [relatedCategories, setRelatedCategories] = useState<CategoryType[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      // Convert URL slug to display category and search tags
      const categoryFromSlug = params.slug.toString();
      setCategory(categoryFromSlug.replace(/-/g, ' ')); // For display
      
      // Convert slug to search tags
      const tags = categoryFromSlug
        .split('-')
        .filter(tag => tag.length > 2); // Filter out short words
      
      setSearchTags(tags);
    } else {
      router.push('/explore');
    }
  }, [params.slug, router]);

  useEffect(() => {
    if (!searchTags.length) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch generations that contain ALL the search tags
        const { data: generationsData, error: generationsError } = await supabase
          .from("generations")
          .select("*")
          .eq("is_public", true)
          .contains('tags', searchTags); // This will match all tags

        if (generationsError) throw generationsError;

        setGenerations(generationsData || []);

        // Select random categories excluding the current search tags
        const otherCategories = featuredTags.filter(cat => 
          !searchTags.some(tag => cat.toLowerCase().includes(tag.toLowerCase()))
        );
        const randomCategories = otherCategories
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        // Fetch sample posts for each random category
        const relatedCategoriesData = await Promise.all(randomCategories.map(async (cat) => {
          const { data, error } = await supabase
            .from("generations")
            .select("id, result_url, prompt")
            .eq("is_public", true)
            .contains('tags', [cat])
            .limit(6);

          if (error) throw error;

          return {
            name: cat,
            posts: data || []
          };
        }));

        setRelatedCategories(relatedCategoriesData);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTags]);

  if (loading) {
    return (
      <div className="min-h-screen text-xs text-gray-500 w-screen h-full flex justify-center items-center">
        <LoadingSpinner />
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
    <div className="mt-24 p-8 w-screen flex flex-col space-y-4">
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
            <BreadcrumbLink href={`/explore/${params.slug}`} className="capitalize">
              {category}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="capitalize text-5xl font-bold pt-2 pb-6">{category}</div>
      {generations.length === 0 ? (
        <div className="text-center text-gray-500">No generations found for this category.</div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {generations.map((item) => (
            <GenerationCard key={item.id} generation={item} />
          ))}
        </div>
      )}
      <div className="w-full">
        <div className="text-2xl font-bold pt-6 pb-6">Explore More</div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedCategories.map((relatedCategory, index) => (
            <div key={index} className="flex justify-center items-center">
              <CategoryCard category={relatedCategory} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}