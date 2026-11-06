const SECRETISH =
  /\b(sk-[A-Za-z0-9_-]{8,}|sk-proj-[A-Za-z0-9_-]{8,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|Bearer\s+[A-Za-z0-9._\-+=/]{12,})\b/gi;

export function redactPreview(text: string): { preview: string; redacted: boolean } {
  const preview = text.replace(SECRETISH, "[redacted]");
  return { preview, redacted: preview !== text };
}
