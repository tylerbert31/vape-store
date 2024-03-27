import prisma from "../../../../lib/prisma";
import memcache from "@/app/lib/node-cache";

export async function GET(request: Request) {
  const { searchParams, search } = new URL(request.url);
  const sort = searchParams.get("sort") ?? "0";
  const textSearch = searchParams.get("search") ?? "";

  let sortConditions: {}[] = [];
  const cachedData = memcache.get(search);

  if(cachedData) {
    return Response.json(cachedData);
  }

  if (Boolean(parseInt(sort))) {
    switch (parseInt(sort)) {
      case 1:
        sortConditions.push({ createdAt: "desc" });
        break;
      case 2:
        sortConditions.push({ sold: "desc" });
        break;
      case 3:
        sortConditions.push({ price: "asc" });
        break;
      case 4:
        sortConditions.push({ price: "desc" });
        break;
      case 5:
        sortConditions.push({ createdAt: "asc" });
        break;
      default:
        sortConditions.push({ createdAt: "desc" });
    }
  }

  const products = await prisma.product.findMany({
    orderBy: sortConditions,
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      size: true,
    },
    where: {
      name: {
        contains: textSearch,
        mode: 'insensitive',
      },
    },
  });
  memcache.set(search, {products}, 600);

  return Response.json({ products });
}
