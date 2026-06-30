import { cn } from "@/lib/utils";
import type { CatImage } from "@/types/cats.types";
import { Frown } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  data: CatImage[];
  loading: boolean;
}

export function ImagesGrid({ data, loading }: Props) {

  if (!loading && data.length === 0) {
    return (
      <div className="flex justify-center text-muted-foreground gap-4">
        <Frown />
        <p>
          No cat found
        </p>
      </div>
    )
  }

  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {data.map((img) => (
        <Link key={img.id} to={loading ? '' : `/cats/${img.id}`}>
          <img
            src={img.url}
            width={img.width}
            height={img.height}
            alt={`Cat photo #${img.id}`}
            className={cn("mb-4 w-full rounded-lg", loading ? "grayscale-100 opacity-50" : '')}
            loading="lazy"
          />
        </Link>
      ))}
    </div>
  )
}
