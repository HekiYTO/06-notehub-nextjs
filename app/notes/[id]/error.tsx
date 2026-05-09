'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
}
