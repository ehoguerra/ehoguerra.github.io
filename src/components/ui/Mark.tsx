/** Artur's mark: a window in front of another, with its grabber. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <rect x="10" y="4.5" width="18" height="13" rx="4" fill="currentColor" opacity="0.32" />
      <rect x="4" y="9.5" width="20" height="14.5" rx="4.5" fill="currentColor" />
      <rect x="9" y="26.6" width="10" height="2" rx="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
