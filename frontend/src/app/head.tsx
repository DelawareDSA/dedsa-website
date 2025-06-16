// src/app/head.tsx
export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta
        name="description"
        content="The Delaware chapter of the Democratic Socialists of America (DSA). Member-run, progressive activism since 2021."
      />

      <link rel="manifest" href="/manifest.json" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
    </>
  );
}
