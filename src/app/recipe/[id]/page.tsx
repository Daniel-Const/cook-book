"use client";
/**
 * Recipe page
 */

export default function Page({ params }: { params: { id: string } }) {
  // TODO: Fetch recipe from server by id
  const recipe = {
    title: "Ravioli",
    description:
      "Easy to cook! Simple and effective. Ravioli with some tomato sauce will always be a great option",
    ingredients: [
      { name: "ravioli-pasta", quantity: "1 packet" },
      { name: "Barilla basil sauce", quantity: "1 jar" },
    ],
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-6xl">{recipe.title}</h1>
        <p className="pt-10">{recipe.description}</p>
        <h2 className="text-4xl pt-10">Ingredients</h2>
      </div>
    </main>
  );
}
