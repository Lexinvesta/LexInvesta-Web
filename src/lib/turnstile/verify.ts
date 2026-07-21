interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
}

interface VerifyOptions {
  remoteIp?: string;
  timeoutMs?: number;
}

export async function verifyTurnstile(
  token: string,
  secretKey: string,
  options: VerifyOptions = {},
): Promise<{ success: boolean; errorCodes: string[] }> {
  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }
  if (!secretKey) {
    return { success: false, errorCodes: ["missing-input-secret"] };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 5000);

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (options.remoteIp) {
      formData.append("remoteip", options.remoteIp);
    }

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData, signal: controller.signal },
    );

    if (!res.ok) {
      return { success: false, errorCodes: [`http-${res.status}`] };
    }

    const data = (await res.json()) as TurnstileResponse;

    return {
      success: data.success === true,
      errorCodes: data["error-codes"] ?? [],
    };
  } catch (err) {
    return {
      success: false,
      errorCodes: [err instanceof Error ? `network-${err.name}` : "unknown"],
    };
  } finally {
    clearTimeout(timeout);
  }
}
