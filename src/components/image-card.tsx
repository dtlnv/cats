import type { CatImage } from "@/types/cats.types";

type ImageCardProps = {
  image?: CatImage
}

export function ImageCard({ image }: ImageCardProps) {
  if (!image) {
    return (
      <div className="flex justify-center text-muted-foreground gap-4">
        <p>
          No cat found
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-4 justify-center items-stretch">
      <div>
        <img
          src={image.url}
          alt={`Cat photo #${image.id}`}
          className="rounded-lg max-h-[80vh] object-contain"
        />
      </div>
      <code className="flex flex-col gap-1 text-sm text-muted-foreground bg-muted p-4 rounded-lg">
        <p className="mt-4">ID: {image.id}</p>
        <p>Width: {image.width}</p>
        <p>Width: {image.width}</p>
        <p>Height: {image.height}</p>
        <p>URL: <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a></p>
      </code>
    </div>
  )
}
