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

// The real animation kit ported from HLL-UI-Demo. These replace the CSS
// stand-ins that used to live in ./hll-button.tsx, ./shader.tsx and
// ./gradient-reveal-text.tsx.
export {
  BottomShader,
  GradientRevealText,
  GradientRevealTextNormal,
  GradientRevealTextSlow,
  HLLButton,
  HLLOutlineButton,
  LightFXShader as Shader,
  LightFXTag,
  MenuTriggerOverlay,
  BASE_SETTINGS,
  TRANSPARENT_SETTINGS,
  DEFAULT_LAYOUT,
  HALF_HEIGHT_LAYOUT,
  makeBottomShaderLayout,
  createShaderFX,
  type BottomShaderLayout,
  type BottomShaderProps,
  type GradientRevealTextProps,
  type HLLButtonProps,
  type HLLOutlineButtonProps,
  type LightFXShaderProps as ShaderProps,
  type LightFXTagProps,
  type MenuTriggerOverlayProps,
  type ShaderSettings,
  type TagVariant,
} from "./lightfx";
