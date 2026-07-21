"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  studySchema,
  studyDefaultValues,
  type StudyFormValues,
} from "@/lib/validation/study";
import { cn } from "@/lib/utils/cn";

type Status = "idle" | "submitting" | "success" | "error";

export function StudyForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null);
  const turnstileRef = React.useRef<{ reset: () => void } | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<StudyFormValues>({
    resolver: zodResolver(studySchema),
    defaultValues: studyDefaultValues,
    mode: "onTouched",
  });

  const consent = useWatch({ control, name: "gdprConsent" });
  const debtType = useWatch({ control, name: "debtType" });
  const situation = useWatch({ control, name: "situation" });

  const onSubmit = async (data: StudyFormValues) => {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Submit failed");
      }

      setStatus("success");
      reset(studyDefaultValues);
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } catch {
      setStatus("error");
      setErrorMessage(t("error"));
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center text-center py-12"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 border border-gold/30 mb-4">
          <CheckCircle2 className="h-7 w-7 text-gold" />
        </div>
        <h3 className="text-xl font-semibold text-cream">{t("success")}</h3>
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)(e);
      }}
      noValidate
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label={t("name")}
          error={errors.name?.message ? t(errors.name.message as string) : undefined}
          required
        >
          <Input
            {...register("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
          />
        </Field>
        <Field
          label={t("phone")}
          error={errors.phone?.message ? t(errors.phone.message as string) : undefined}
          required
        >
          <Input
            type="tel"
            inputMode="tel"
            placeholder={t("placeholders.phone")}
            autoComplete="tel"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label={t("email")}
          error={errors.email?.message ? t(errors.email.message as string) : undefined}
          required
        >
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field
          label={t("province")}
          error={errors.province?.message ? t(errors.province.message as string) : undefined}
          required
        >
          <Input
            {...register("province")}
            autoComplete="address-level2"
            aria-invalid={!!errors.province}
          />
        </Field>
      </div>

      <Field
        label={t("debt")}
        error={errors.debt?.message ? t(errors.debt.message as string) : undefined}
        required
      >
        <Input
          type="text"
          inputMode="numeric"
          placeholder={t("placeholders.debt")}
          {...register("debt")}
          aria-invalid={!!errors.debt}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label={t("debtType")}
          error={errors.debtType?.message ? t(errors.debtType.message as string) : undefined}
          required
        >
          <Select
            value={debtType}
            onValueChange={(v) =>
              setValue("debtType", v, { shouldValidate: true, shouldTouch: true })
            }
          >
            <SelectTrigger aria-invalid={!!errors.debtType}>
              <SelectValue placeholder={t("debtTypeOptions.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personalLoans">{t("debtTypeOptions.personalLoans")}</SelectItem>
              <SelectItem value="creditCards">{t("debtTypeOptions.creditCards")}</SelectItem>
              <SelectItem value="microloans">{t("debtTypeOptions.microloans")}</SelectItem>
              <SelectItem value="taxAgency">{t("debtTypeOptions.taxAgency")}</SelectItem>
              <SelectItem value="mortgages">{t("debtTypeOptions.mortgages")}</SelectItem>
              <SelectItem value="mixed">{t("debtTypeOptions.mixed")}</SelectItem>
              <SelectItem value="other">{t("debtTypeOptions.other")}</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field
          label={t("situation")}
          error={errors.situation?.message ? t(errors.situation.message as string) : undefined}
          required
        >
          <Select
            value={situation}
            onValueChange={(v) =>
              setValue("situation", v, { shouldValidate: true, shouldTouch: true })
            }
          >
            <SelectTrigger aria-invalid={!!errors.situation}>
              <SelectValue placeholder={t("situationOptions.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">{t("situationOptions.current")}</SelectItem>
              <SelectItem value="missedPayments">{t("situationOptions.missedPayments")}</SelectItem>
              <SelectItem value="garnishments">{t("situationOptions.garnishments")}</SelectItem>
              <SelectItem value="lawsuit">{t("situationOptions.lawsuit")}</SelectItem>
              <SelectItem value="creditBureau">{t("situationOptions.creditBureau")}</SelectItem>
              <SelectItem value="other">{t("situationOptions.other")}</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label={t("message")}>
        <Textarea
          rows={3}
          maxLength={2000}
          {...register("message")}
        />
      </Field>

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) =>
            setValue("gdprConsent", checked === true, { shouldValidate: true })
          }
          aria-invalid={!!errors.gdprConsent}
        />
        <Label htmlFor="consent" className="text-xs leading-relaxed text-muted font-normal cursor-pointer">
          {t("gdprConsent")}{" "}
          <Link
            href="/legal/privacy"
            className="text-gold underline underline-offset-2 hover:text-gold-soft"
          >
            {t("privacyPolicy")}
          </Link>
        </Label>
      </div>
      {errors.gdprConsent && (
        <p className="text-xs text-red-400 -mt-2 ml-8" role="alert">
          {t(errors.gdprConsent.message as string)}
        </p>
      )}

      {siteKey && (
        <div className="pt-2">
          <Turnstile
            ref={turnstileRef as never}
            siteKey={siteKey}
            onSuccess={(token) => {
              setTurnstileToken(token);
              setValue("turnstileToken", token, { shouldValidate: true });
            }}
            onError={() => {
              setTurnstileToken(null);
              setValue("turnstileToken", "", { shouldValidate: true });
            }}
            onExpire={() => {
              setTurnstileToken(null);
              setValue("turnstileToken", "", { shouldValidate: true });
            }}
            options={{
              theme: "dark",
              language: "es",
              size: "flexible",
            }}
          />
          {errors.turnstileToken && (
            <p className="text-xs text-red-400 mt-1" role="alert">
              {t(errors.turnstileToken.message as string)}
            </p>
          )}
        </div>
      )}

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || (Boolean(siteKey) && !turnstileToken)}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">
        {label}
        {required && <span className="text-gold ml-0.5" aria-hidden="true">*</span>}
      </Label>
      {children}
      {error && (
        <p className={cn("text-xs text-red-400")} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
