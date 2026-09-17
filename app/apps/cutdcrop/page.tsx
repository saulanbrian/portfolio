import { isFeatureEnabled, FLAGS } from "@/lib/configcat";
import { CutDCropContent } from "./cutdcrop-content";

export const dynamic = "force-dynamic";

export default async function CutDCropPage() {
  const enabled = await isFeatureEnabled(FLAGS.CUTDCROP_ENABLED);
  return <CutDCropContent enabled={enabled} />;
}
