"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validation/contact";

interface ContactFormProps {
  heading?: string;
  description?: string;
}

export function ContactForm({ heading, description }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.error ?? "Failed to send message");
    }

    setSubmitted(true);
    reset();
  }

  return (
    <section className="px-4 py-section">
      <div className="mx-auto max-w-xl">
        {(heading || description) && (
          <div className="mb-8 text-center">
            {heading && (
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-base text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        {submitted ? (
          <div className="rounded-xl border border-border bg-muted/50 p-8 text-center">
            <p className="text-lg font-medium text-foreground">
              Message sent!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ll get back to you as soon as possible.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="company">
                  Company{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="company"
                  placeholder="Your company"
                  {...register("company")}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">
                  Phone{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                rows={5}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
