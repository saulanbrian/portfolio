import { isFeatureEnabled, FLAGS } from "@/lib/configcat";
import { PaperlineContent } from "./paperline-content";

export const dynamic = "force-dynamic";

export default async function PaperlinePage() {
  const enabled = await isFeatureEnabled(FLAGS.PAPERLINE_ENABLED);
  return <PaperlineContent enabled={enabled} />;
}