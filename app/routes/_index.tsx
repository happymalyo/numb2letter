import type { MetaFunction } from "@remix-run/node";
import { TranslationCard } from "~/components/TranslationCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Number2Letter" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <TranslationCard />
    </div>
  );
}
