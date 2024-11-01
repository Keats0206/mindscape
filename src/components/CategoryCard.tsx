import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";

export default function CategoryCard({ category }: { category: Category }) {    
    return (
        <div className="w-full flex justify-center items-center">
            <Link href={`/explore/${category.slug}`} key={category.name}>
                <div key={category.name} className="transition-all duration-300 hover:shadow-md hover:bg-stone-100 hover:shadow-stone-200 flex flex-col rounded-sm space-y-2 border border-stone-200 p-4" >
                <div className="flex flex-row w-full justify-between">
                    <h2 className="text-2xl capitalize">{category.name}</h2>
                    <Button variant="outline">View All</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
        </div>
    )
}