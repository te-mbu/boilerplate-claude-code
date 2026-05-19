"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CtaNewsletterProps {
  heading: string;
  description?: string;
  placeholder?: string;
}

export function CtaNewsletter({
  heading,
  description,
  placeholder = "Enter your email",
}: CtaNewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: integrate with newsletter provider
    console.log("Newsletter signup:", email);
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          {heading}
        </h2>
        {description && (
          <p className="mt-3 text-base text-muted-foreground">{description}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            required
            className="flex-1"
          />
          <Button type="submit" size="lg">
            Subscribe
          </Button>
        </form>
        {status === "success" && (
          <p className="mt-3 text-sm text-primary">
            Thanks for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}
