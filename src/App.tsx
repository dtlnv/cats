import "./index.css";
import { Header } from "@/components/header";

export function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto w-full max-w-[76rem] px-4 py-8 sm:px-6 sm:py-12 md:px-6 md:py-16">
        <Header />
      </div>
    </div>
  );
}

export default App;
