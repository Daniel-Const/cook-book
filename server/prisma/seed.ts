import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   const pesto = await prisma.ingredient.create({
  //     data: {
  //       name: "pesto",
  //     },
  //   });

  //   const penne = await prisma.ingredient.create({
  //     data: {
  //       name: "penne",
  //     },
  //   });

  // Seed ingredients
  const ingredients = [
    "pesto",
    "penne",
    "bread",
    "garlic",
    "olive oil",
    "salt",
  ];

  await Promise.all(
    ingredients.map(async (name) => {
      await prisma.ingredient.create({
        data: {
          name,
        },
      });
    })
  );

  await prisma.recipe.create({
    data: {
      name: "Penne & Pesto",
      description: "Beautiful penne pasta with pesto sauce - quick and easy!",
      method: "Boil pasta||Open pesto jar||Mix pesto sauce into pasta||Enjoy!",
      ingredients: {
        create: [
          { ingredientId: 1, quantity: "1 jar" },
          { ingredientId: 2, quantity: "600g" },
        ],
      },
    },
  });

  await prisma.recipe.create({
    data: {
      name: "Garlic Bread",
      description: "Perfect side for any pasta dish!",
      method:
        "Toast bread in oven||Rub bread with crushed garlic clove||drizzle with olive||Light sprinkle with salt||Enjoy!",
      ingredients: {
        create: [
          { ingredientId: 3, quantity: "6 slices" },
          { ingredientId: 4, quantity: "1 clove" },
          { ingredientId: 5, quantity: "6 drizzlings" },
          { ingredientId: 6, quantity: "1 pinch" },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
