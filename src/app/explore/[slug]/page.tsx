"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Head from "next/head";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Category, Generation } from '@/types';
import { GenerationCard } from "@/components/GenerationCard";
import { categoryData } from "@/data/featuredCategories";
import LoadingSpinner from "@/components/ui/loading-spinner";
import CategoryCard from "@/components/CategoryCard";

// Create a separate SEO component for better organization
const DynamicSEO = ({ category, generations }: { category: Category, generations: Generation[] }) => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{`${category.name} | GenspoAI`}</title>
      <meta name="description" content={category.description} />
      <meta name="keywords" content={category.tags.join(", ")} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://genspoai.com/explore/${category.slug}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={`${category.name} | GenspoAI`} />
      <meta property="og:description" content={category.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://genspoai.com/explore/${category.slug}`} />
      <meta property="og:image" content="https://genspoai.com/public/generalAI.webp" />
      <meta property="og:site_name" content="GenspoAI" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@genspoai" />
      <meta name="twitter:title" content={`${category.name} | GenspoAI`} />
      <meta name="twitter:description" content={category.description} />
      <meta name="twitter:image" content="https://genspoai.com/public/generalAI.webp" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${category.name} | GenspoAI`,
            "description": category.description,
            "url": `https://genspoai.com/explore/${category.slug}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": generations.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": item.result_url,
                "name": item.prompt,
                "image": item.result_url
              }))
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://genspoai.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Explore",
                  "item": "https://genspoai.com/explore"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": category.name,
                  "item": `https://genspoai.com/explore/${category.slug}`
                }
              ]
            }
          })
        }}
      />
    </Head>
  );
};

export default function CategoryPage() {
  const router = useRouter(); 
  const params = useParams();
  const [category] = useState<Category>(categoryData.find(cat => cat.slug === params.slug) || categoryData[0]);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [relatedCategories, setRelatedCategories] = useState<Category[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      // Set search tags based on slug for database filtering
      const tags = category.slug.split('-').filter(tag => tag.length > 2);
      setSearchTags(tags);
    } else {
      router.push('/explore');  
    }
  }, [category, router]);

  useEffect(() => {
    if (!searchTags.length) return;
  
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch generations that match all search tags
        const { data: generationsData, error: generationsError } = await supabase
          .from("generations")
          .select("*")
          .eq("is_public", true)
          .contains("tags", searchTags);
  
        if (generationsError) throw generationsError;

        console.log("GENERATIONS DATA:", generationsData);
  
        setGenerations(generationsData || []);
  
        // Filter out current category and select related ones
        const otherCategories = categoryData.filter(cat => cat.slug !== category.slug);
        const randomCategories = otherCategories.sort(() => 0.5 - Math.random()).slice(0, 4);
  
        console.log("RANDOM CATEGORIES:", randomCategories);
  
        const categoryPostsData = [];
        for (const cat of randomCategories) {
          const { data, error } = await supabase
            .from("generations")
            .select("id, result_url, prompt")
            .contains("tags", cat.tags)
            .order("created_at", { ascending: false })
            .limit(6);
  
          if (error) throw error;
  
          categoryPostsData.push({
            name: cat.name,
            description: cat.description,
            slug: cat.slug,
            tags: cat.tags,
            posts: data || [] // Ensure an empty array if no data is found
          });
        }
  
        console.log("GOT RELATED CATEGORIES WITH POSTS:", categoryPostsData);
        setRelatedCategories(categoryPostsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [searchTags, category.slug]);

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
    <div className="mt-20 p-4 w-screen flex flex-col space-y-2">
      <DynamicSEO category={category} generations={generations} />
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
              {category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="capitalize text-5xl font-bold pt-2">{category.name}</h1>
      <h2 className="text-xl text-gray-500 pt-2 pb-6">{category.description}</h2>
      {generations.length === 0 ? (
        <div className="text-center text-gray-500">No generations found for this category.</div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {generations.map((item) => (
            <GenerationCard key={item.id} generation={item} />
          ))}
        </div>
      )}
      {/* Add this in later not core function */}
      <div className="w-full">
        <div className="text-2xl font-bold pt-6 pb-6">Explore More</div>
        <div className="content-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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