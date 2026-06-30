import { Header } from "@/components/header";
import { useParams } from "react-router-dom";

export function CatPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto w-full max-w-[76rem] px-4 py-8 sm:px-6 sm:py-12 md:px-6 md:py-16">
        <Header />
        Cat # ${id}
      </div>
    </div>
  );
}
