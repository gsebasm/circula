import { CatalogItem } from "@/utils/types"
import Image from "next/image"

interface CatalogItemShow {
    item: CatalogItem
}

export default function CatalogItemShow({ item }: CatalogItemShow) {
    return (
        <div className="px-3 py-1 rounded border">
            <Image
                src={item.image}
                width={150}
                height={150}
                alt="Product"
            />
            <b>{item.name}</b>
            <p>{item.price}</p>
            <p className="text-green-400">Reducido {item.footprint}</p>
        </div>
    )
}
