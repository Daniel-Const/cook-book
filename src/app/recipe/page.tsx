/**
 * Recipes list
 */

import Layout from "@/components/layout/Layout"
import RecipeCard from "@/components/recipe/RecipeCard";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-5xl text-center">Recipes</h1>
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm">
        <div className="grid p-2">
          <RecipeCard
            title="Ravioli"
            description="Some yummy ravioli"
            id="123"
            imgSrc="123"
          ></RecipeCard>
          <RecipeCard
            title="Ravioli"
            description="Some yummy ravioli"
            id="123"
            imgSrc="123"
          ></RecipeCard>
          <RecipeCard
            title="Ravioli"
            description="Some yummy ravioli"
            id="123"
            imgSrc="123"
          ></RecipeCard>
          <RecipeCard
            title="Ravioli"
            description="Some yummy ravioli"
            id="123"
            imgSrc="123"
          ></RecipeCard>
        </div>
      </div>
      </Layout>
  );
}
