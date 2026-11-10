import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
} from "./pageTypography";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
export { LandingPageFrame, applyBackgroundPresentation } from "./LandingPageFrame";
export type { LandingPageFrameProps, LandingPageProps } from "./LandingPageFrame";
import { KAGE_TYPOGRAPHY } from "./pageRecipes";

/* ─────────────────────────────────────────────────────────────────────────────
   KageLandingPage — the registered source, unchanged in behaviour.

   The upstream module also exports twenty-one sibling pages, each of which
   imports its own `?raw` document and variant builder from directories that
   the published package does not ship. Only the Kage document travels with
   this project, so only its component is kept here; the body of the function
   below is byte-identical to the source supplied for revision c8e06b90397a.
   ──────────────────────────────────────────────────────────────────────────── */

export function KageLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Kage — Where stillness reveals the unseen" sourceUrl="/landing-pages/kage.html" />;
}
