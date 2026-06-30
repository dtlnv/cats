import { Header } from "@/components/header";
import { useSearch } from "@/hooks/useSearch";
import { ImagesGrid } from "@/components/images-grid";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useLimitContext } from "@/providers/limit-provider";

export function HomePage() {
  const { limit } = useLimitContext();
  const { loading, data, error, onRetry } = useSearch(limit);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto w-full max-w-[76rem] px-4 py-8 sm:px-6 sm:py-12 md:px-6 md:py-16">
        <Header loading={loading} />
        {!error && <ImagesGrid data={data} loading={loading} />}
        {error ? (
          <Button onClick={onRetry} disabled={loading}>
            {loading && <Loader className="animate-spin" />}
            Retry
          </Button>
        ) : null}
      </div>
    </div>
  );
}