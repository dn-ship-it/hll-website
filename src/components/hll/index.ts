export { GradientRevealText, GradientRevealTextNormal } from "./gradient-reveal-text";
export { Shader, BottomShader } from "./shader";
export { OurPromise } from "./our-promise";
export { Tag, HLLServiceTag } from "./tag";
export {
  HLL_VARIANTS,
  NAV_VARIANTS,
  SERVICE_VARIANTS,
  VARIANT_GRADIENTS,
  getVariantColors,
  gradientCss,
  type HLLVariant,
  type NavVariant,
  type ServiceVariant,
} from "./variants";

// The real LightFX (three.js) kit ported from HLL-UI-Demo. HLLButton here
// replaces the CSS stand-in that used to live in ./hll-button.tsx.
export {
  HLLButton,
  HLLOutlineButton,
  LightFXShader,
  LightFXTag,
  MenuTriggerOverlay,
  BASE_SETTINGS,
  TRANSPARENT_SETTINGS,
  createShaderFX,
  type HLLButtonProps,
  type HLLOutlineButtonProps,
  type LightFXShaderProps,
  type LightFXTagProps,
  type MenuTriggerOverlayProps,
  type ShaderSettings,
  type TagVariant,
} from "./lightfx";
