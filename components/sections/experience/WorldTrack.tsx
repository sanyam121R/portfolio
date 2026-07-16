import { forwardRef } from "react";
import SceneIntro from "./SceneIntro";
import ScenePersistent from "./ScenePersistent";
import SceneInfoHub from "./SceneInfoHub";
import SceneCloudEQ from "./SceneCloudEQ";
import SceneEnding from "./SceneEnding";

/**
 * The horizontal world. A single flex row that translates left as the user
 * scrolls vertically. Each child scene owns its own width and composition.
 * The track itself is intentionally dumb — it only arranges the scenes.
 */
const WorldTrack = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="flex h-full w-max flex-nowrap will-change-transform"
    >
      <SceneIntro />
      <ScenePersistent />
      <SceneInfoHub />
      <SceneCloudEQ />
      <SceneEnding />
    </div>
  );
});

WorldTrack.displayName = "WorldTrack";

export default WorldTrack;