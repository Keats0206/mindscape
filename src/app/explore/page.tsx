"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Category, Post } from '@/types';
import { categoryData } from '@/data/featuredCategories'

export default function ExplorePage() {
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try { 
        const fetchedCategories: Category[] = [];
        const trimmedCategories = categoryData.slice(0, 10);
        for (const category of trimmedCategories) {    
          console.log(category);      
          const { data, error } = await supabase
            .from('generations')
            .select('id, result_url, prompt')
            .contains('tags', [category.tags])
            .order('created_at', { ascending: false })
            .limit(6);

          if (error) throw error;

          if (data && data.length > 0) {
            fetchedCategories.push({
              name: category.name,
              description: category.description,
              slug: category.slug,
              tags: category.tags,
              posts: data as Post[]
            });
          }
        }
        setFeaturedCategories(fetchedCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-screen px-4 pt-16">
      <div className="w-full flex flex-col gap-2 h-72 items-center justify-center">
        <h1 className="text-4xl font-bold pb-2">Featured Categories</h1>
        <p className="text-xl text-gray-500 text-center">Explore our curated selection of home decor styles</p>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      ):(
        <div className="w-full flex flex-col gap-4 pb-16">
        {featuredCategories.map((category) => (
          <Link href={`/explore/${category.slug}`} key={category.name}>
            <div key={category.name} className="transition-all duration-300 hover:shadow-md hover:bg-stone-100 hover:shadow-stone-200 flex flex-col rounded-sm space-y-2 border border-stone-200 p-4" >
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl capitalize font-medium">{category.name}</h2>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
                <Button variant="outline">View All</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {category.posts?.map((post) => (
                  <div key={post.id} className="flex items-center justify-center aspect-square bg-stone-200 rounded-sm overflow-hidden">
                    <Image
                      src={post.result_url}
                      alt={post.prompt}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                      placeholder="blur"
                      blurDataURL={post.result_url}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Link>
          ))}
        </div>
      )}
    </div>
  );
}