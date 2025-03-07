import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
        <p className="text-center">Run your agency, in one place </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative ">
          <h1 className="text-9xl font-bold text-center ">Plura</h1>
        </div>
        <div className="flex jutify-center items-center relative md:-mt-[20px]">
          <Image
            src="/preview.png"
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-20 md:mt-56 lg:mt-96">
        <h2 className="text-center text-4xl">Choose what fits right</h2>
        <p className="text-muted-foreground text-center">
          Our Straight forward pricing plans are tailored to meet your needs. If{" "}
          {" Your're"} not <br />
          ready to commit you can get started for free
        </p>
        <div className="flex  gap-4 flex-wrap mt-6 justify-center">
          {pricingCards.map(
            ({
              description,
              duration,
              features,
              highlight,
              price,
              priceId,
              title,
            }) => (
              // TODO: Working Progress tab
              <Card
                key={title}
                className={cn(
                  "w-[300px] flex flex-col justify-between",
                  title === "Unlimited Saas" && "border-2 border-primary",
                )}
              >
                <CardHeader>
                  <CardTitle
                    className={cn(
                      title !== "Unlimited Saas" && "text-muted-foreground",
                    )}
                  >
                    {title}
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{price}</span>
                  <span className="text-4xl font-bold">/m</span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 ">
                  <div>
                    {features.map((feature) => (
                      <div key={feature} className="flex gap-2 items-center ">
                        <Check />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/agency?plan=${priceId}`}
                    className={cn(
                      "w-full text-center bg-primary p-4 rounded-md ",
                      title === "Unlimited Saas" && "!bg-muted-foreground",
                    )}
                  >
                    Get Started
                  </Link>
                </CardFooter>
              </Card>
            ),
          )}
        </div>
      </section>
    </>
  );
}
