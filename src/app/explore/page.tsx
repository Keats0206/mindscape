import React from 'react';

export default function ExplorePage() {
  const featuredCategories = [
    {
      name: "Category 1",
      posts: [0,1,2,3,4,5]
    },
    {
      name: "Category 2",
      posts: [0,1,2,3,4,5]
    }
  ]

  return (
    <div className="flex flex-col gap-4 w-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col gap-2 h-48 items-center justify-center">
        <h1 className="text-4xl font-medium">Trending Categories</h1>
        <p className="text-xl">Discover the latest trends of creation on Genspo</p>
      </div>
      {featuredCategories.map((category) => (
        <div key={category.name} className="flex flex-col rounded-sm space-y-2">
          <div className="flex flex-row w-full justify-between">
            <h2 className="text-2xl">#{category.name}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {category.posts.map((imageIndex) => (
              <div key={imageIndex} className="flex items-center justify-center aspect-square bg-stone-200 rounded-sm">
                Image {imageIndex + 1}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}