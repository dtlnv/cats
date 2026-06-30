import { Header } from "@/components/header";
import { useCatDetails } from "@/hooks/useCatDetails";

export function CatPage() {
  const { data, loading, error, onRetry } = useCatDetails();

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto w-full max-w-[76rem] px-4 py-8 sm:px-6 sm:py-12 md:px-6 md:py-16">
        <Header loading={loading} />
        Cat # ${data?.id}
      </div>
    </div>
  );
}
