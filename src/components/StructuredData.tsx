import { personJsonLd } from "@/lib/person";

/** The same facts the page states in prose, in the one format agents can read. */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // The payload is a literal object, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
    />
  );
}
