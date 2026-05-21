import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface ComparisonItem {
  feature: string;
  included: boolean;
}

interface ComparisonOption {
  name: string;
  description?: string;
  items: ComparisonItem[];
  highlighted?: boolean;
}

interface ComparisonCardsProps {
  options: ComparisonOption[];
  heading?: string;
  subheading?: string;
}

export function ComparisonCards({
  options,
  heading,
  subheading,
}: ComparisonCardsProps) {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid gap-6 ${
            options.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {options.map((option) => (
            <Card
              key={option.name}
              className={
                option.highlighted ? "ring-2 ring-primary" : ""
              }
            >
              <CardHeader>
                <CardTitle>{option.name}</CardTitle>
                {option.description && (
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {option.items.map((item) => (
                    <li
                      key={item.feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      {item.included ? (
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      ) : (
                        <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" />
                      )}
                      <span
                        className={
                          item.included
                            ? "text-foreground"
                            : "text-muted-foreground line-through"
                        }
                      >
                        {item.feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
