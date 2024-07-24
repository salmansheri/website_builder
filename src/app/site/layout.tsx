import { Navigation } from "@/components/navigation";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full">
      <Navigation />
      {children}
    </main>
  );
}
