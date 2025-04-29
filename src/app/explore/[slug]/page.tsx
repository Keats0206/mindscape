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
  if (!category) {
    return null;
  }
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

  const currentSlug = typeof params.slug === 'string' ? params.slug : undefined;
  const category = currentSlug ? categoryData.find(cat => cat.slug === currentSlug) : undefined;

  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [relatedCategories, setRelatedCategories] = useState<Category[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentSlug && !category) {
      console.warn(`Category not found for slug: ${currentSlug}, redirecting to /explore.`);
      router.push('/explore');
    }
  }, [currentSlug, category, router]);

  useEffect(() => {
    if (category) {
      const tags = category.slug.split('-').filter(tag => tag.length > 2);
      setSearchTags(tags);
    } else {
      setSearchTags([]);
    }
  }, [category]);

  useEffect(() => {
    if (!category || !searchTags.length) {
      setGenerations([]);
      setRelatedCategories([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log(`Fetching data for category: ${category.name}, tags: ${searchTags.join(', ')}`);
      try {
        const { data: generationsData, error: generationsError } = await supabase
          .from("generations")
          .select("*")
          .eq("is_public", true)
          .contains("tags", searchTags);
  
        if (generationsError) throw generationsError;

        console.log("GENERATIONS DATA:", generationsData);
  
        setGenerations(generationsData || []);
  
        const otherCategories = categoryData.filter(cat => cat.slug !== category.slug);
        const randomCategories = otherCategories.sort(() => 0.5 - Math.random()).slice(0, Math.min(4, otherCategories.length));
  
        console.log("RANDOM RELATED CATEGORIES:", randomCategories);
  
        const relatedCategoryDataPromises = randomCategories.map(async (cat) => {
          const catTags = cat.slug.split('-').filter(tag => tag.length > 2);
          const { data, error } = await supabase
            .from("generations")
            .select("id, result_url, prompt")
            .contains("tags", catTags)
            .eq("is_public", true)
            .order("created_at", { ascending: false })
            .limit(1);
  
          if (error) {
            console.error(`Error fetching preview for category ${cat.name}:`, error);
            return { ...cat, posts: [] };
          }
          return { ...cat, posts: data || [] };
        });
  
        const resolvedRelatedCategories = await Promise.all(relatedCategoryDataPromises);
  
        console.log("RELATED CATEGORIES WITH POSTS:", resolvedRelatedCategories);
        setRelatedCategories(resolvedRelatedCategories);
      } catch (err: unknown) {
        console.error("Error fetching data:", err);
        const errorMessage = err && typeof err === 'object' && 'message' in err 
          ? (err.message as string) 
          : "Please try again later.";
        setError(`Failed to load data: ${errorMessage}`);
        setGenerations([]);
        setRelatedCategories([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [searchTags, category]);

  if (loading && !error) {
    return (
      <div className="min-h-screen text-xs text-gray-500 w-screen h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-xs text-red-500 w-screen h-full flex justify-center items-center p-4">
        {error}
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading category information...
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
            <BreadcrumbLink href={`/explore/${currentSlug}`} className="capitalize">
              {category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="capitalize text-5xl font-bold pt-2">{category.name}</h1>
      <h2 className="text-xl text-gray-500 pt-2 pb-6">{category.description}</h2>
      {loading ? (
        <div className="text-center text-gray-500"><LoadingSpinner /></div>
      ) : generations.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No public generations found matching the tags for &apos;{category.name}&apos;.</div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {generations.map((item) => (
            <GenerationCard key={item.id} generation={item} />
          ))}
        </div>
      )}
      <div className="w-full pt-10">
        <div className="text-2xl font-bold pt-6 pb-6">Explore More</div>
        {relatedCategories.length > 0 ? (
          <div className="content-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCategories.map((relatedCategory, index) => (
              <div key={index} className="flex justify-center items-center">
                <CategoryCard category={relatedCategory} />
              </div>
            ))}
          </div>
        ) : (
          !loading && <div className="text-center text-gray-500">No other categories to explore currently.</div>
        )}
      </div>
    </div>
  );
}