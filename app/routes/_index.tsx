import type { MetaFunction } from "@remix-run/node";
import { ConvertCard } from "~/components/ConvertCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Number2Letter" },
    {
      name: "description",
      content: "Convert number to letter in Malagasy, French and English",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ConvertCard />
    </div>
  );
}
