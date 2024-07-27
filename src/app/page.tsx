import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return redirect("/agency/sign-in");
  }

  if (user) {
    return redirect("/site");
  }

  return <div>Hello</div>;
}
