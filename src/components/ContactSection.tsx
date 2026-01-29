"use client";
import React from "react";
import {
  Input,
  Button,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  InputGroupTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components";
import { Controller, Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useFormspree } from "@formspree/react";
import { Check, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "This field is required"),
  subject: z.string().optional(),
  email: z.email("Invalid email address"),
  message: z
    .string()
    .min(1, "This field is required")
    .max(500, "Your message is too long"),
});
export function ContactSection() {
  const [state, handleSubmit] = useFormspree("mpwwnzqz");
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      message: "",
    },
  });
  if (true) {
    return (
      <div className="flex gap-4 max-w-xl items-center bg-secondary-foreground px-5 py-3 rounded-xl">
        <Check className="border-2 border-success-500 bg-success-100 text-success-500 size-11 p-1.5 rounded-full" />
        <div>
          <h2>Message sent!</h2>
          <p>Thanks for reaching out! I'll be in touch with you soon.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Let&apos;s Connect
        </h3>
        <p className="text-[#ADB7BE] mb-6 max-w-md">
          I&apos;m currently looking for new opportunities. My inbox is always
          open. Whether you have a question or just want to say hi, feel free to
          send a message!
        </p>
      </div>
      <div>
        <Form
          id="contact-form"
          control={form.control}
          // Ensure Formspree receives the event as expected (react-hook-form gives values not event!)
          onSubmit={async (e) => {
            // Let react-hook-form handle validation and gathering values
            await form.handleSubmit((values) => handleSubmit(values))();
          }}
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your name or business name"
                    id="name"
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com"
                    id="email"
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="subject"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="subject">Subject</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="What is this message about?"
                    id="subject"
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="message">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="message"
                      placeholder="Just saying hey..."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={state.submitting}>
              {state.submitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Send Message"
              )}
            </Button>
          </FieldGroup>
        </Form>
      </div>
    </div>
  );
}
