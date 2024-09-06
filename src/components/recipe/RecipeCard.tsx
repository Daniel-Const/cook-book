"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RecipeCard({
  id,
  title,
  description,
  imgSrc,
}: {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
}) {
  const currentPath = usePathname();
  const hoverStyle = {
    'border-color': 'white'
  };
  return (
    <Link href={`${currentPath}/${id}`}>
      <div className="bg-slate-200 rounded grid grid-rows-3 grid-flow-col gap-4 p-4 m-4 hover:bg-blue-500">
        <div className="row-span-3">
          <h1 className="text-lg">{title}</h1>
          <p>{description}</p>
        </div>
        {/* <div className="row-span-3 col-span-1">
          <p>img goes here</p>
        </div> */}
      </div>
    </Link>
  );
}
