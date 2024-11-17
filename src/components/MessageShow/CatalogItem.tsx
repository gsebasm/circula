import { CatalogItem } from "@/utils/types";
import Image from "next/image";
import { Leaf } from "lucide-react";

interface CatalogItemShow {
  item: CatalogItem;
}

export default function CatalogItemShow({ item }: CatalogItemShow) {
  return (
    <div className="bg-white rounded-lg">
      <div className="w-full aspect-square relative rounded-lg overflow-hidden">
        <Image
          src={item.image}
          fill
          style={{ objectFit: "cover" }}
          alt="Product"
        />
      </div>
      <div className="pt-2">
        <h3 className="text-sm font-medium text-black">{item.name}</h3>
        <p className="text-sm font-semibold text-black my-1">
          ${item.price}/m²
        </p>
        <div className="flex items-center gap-1 text-green-500">
          <Leaf size={14} />
          <span className="text-xs">Reducido {item.footprint}%</span>
        </div>
      </div>
    </div>
  );
}
