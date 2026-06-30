import { cn } from "@/lib/utils";
import type { CatImage } from "@/types/cats.types";

type Props = {
  data: CatImage[];
  loading: boolean;
}

export function ImagesGrid({ data, loading }: Props) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {data.map((img) => (
        <img
          key={img.id}
          src={img.url}
          width={img.width}
          height={img.height}
          alt={`Cat photo #${img.id}`}
          className={cn("mb-4 w-full rounded-lg", loading ? "grayscale-100 opacity-50" : '')}
          loading="lazy"
        />
      ))}
    </div>
  )
}
