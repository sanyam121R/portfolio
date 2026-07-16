import { createContext, useContext } from "react";
import type { gsap } from "gsap";

export type ExperienceContextValue = {
  containerAnimation: gsap.core.Tween | null;
};

export const ExperienceContext = createContext<ExperienceContextValue>({
  containerAnimation: null,
});

export const useExperience = () => useContext(ExperienceContext);