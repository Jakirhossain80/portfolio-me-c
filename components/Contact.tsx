"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

type SubmitStatus = "idle" | "success" | "error";

const fieldClasses =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground " +
  "transition duration-200 ease-out placeholder:text-muted " +
  "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent";

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Contact" title="Get in touch" />
      </Reveal>

      <Reveal delay={90}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-10 flex flex-col gap-5"
        >
          {/* Honeypot — hidden from real users, left blank; bots often fill it in. */}
          <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-foreground">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className={fieldClasses}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-error">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={fieldClasses}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-error">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm text-foreground">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className={`${fieldClasses} resize-none`}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-xs text-error">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" variant="primary" disabled={isSubmitting} className="self-start">
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>

          {status === "success" && (
            <p className="text-sm text-accent">
              Message sent — I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-error">
              Something went wrong sending your message. Please try again.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
