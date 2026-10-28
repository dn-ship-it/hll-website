// ripple-shader.js
// Copied unchanged from HLL-UI-Demo: src/components/ripple/shader.frag, shader.vert,
// ripple-variants.js (VARIANT_GRADIENTS) and ripple-definition.js (VARIANT_PARAMS).
// If those files change in the repo, re-copy them here. Do not hand-edit values.
export const RIPPLE_FRAG = "precision highp float;\n\n// ======================================================\n// UNIFORMS\n// ======================================================\n\nuniform float uTime;\nuniform vec2 uResolution;\n\nuniform float uBands;\nuniform float uSpeed;\nuniform float uFlowStrength;\nuniform float uShearStrength;\nuniform float uRippleShape;\nuniform float uRippleNoise;\nuniform float uRippleGap;\n\nuniform vec2 uOrigin;\n\n#define MAX_RIPPLES 32\n\nuniform bool uTapRippleMode;\nuniform int uRippleCount;\nuniform vec2 uRipplePoints[MAX_RIPPLES];\n\nuniform vec3 uPalette[6];\nuniform bool uUseCustomPalette;\nuniform float uGradientMotion;\nuniform float uGradientSoftness;\nuniform float uGradientScale;\nuniform float uGradientRotation;\nuniform float uGradientWobble;\n\nuniform float uSaturation;\nuniform float uVibrancy;\nuniform float uContrast;\n\nvarying vec2 vTexCoord;\n\nuniform sampler2D uPaintTexture;\nuniform int uInteractionMode;\nuniform float uPaintStrength;\n\n// ======================================================\n// UTILS\n// ======================================================\n\nvec2 toAspectSpace(vec2 uv, float aspect) {\n    return vec2(uv.x * aspect, uv.y);\n}\n\nvec2 fromAspectSpace(vec2 p, float aspect) {\n    return vec2(p.x / aspect, p.y);\n}\n\nmat2 rot(float a) {\n    float s = sin(a);\n    float c = cos(a);\n    return mat2(c, -s, s, c);\n}\n\nfloat luminance(vec3 c) {\n    return dot(c, vec3(0.299, 0.587, 0.114));\n}\n\nvec2 stabilizeUV(vec2 uv) {\n    return mix(\n        uv,\n        clamp(uv, 0.001, 0.999),\n        0.85\n    );\n}\n\nvec3 applyColorControls(vec3 col) {\n\n    float luma = luminance(col);\n\n    col = mix(\n        vec3(luma),\n        col,\n        max(uSaturation, 1.0)\n    );\n\n    float avg = (col.r + col.g + col.b) / 3.0;\n    float mx = max(col.r, max(col.g, col.b));\n\n    float amt = (mx - avg) * (-uVibrancy * 3.0);\n\n    col = mix(col, vec3(mx), amt);\n\n    col = (col - 0.5) * uContrast + 0.5;\n\n    return clamp(col, 0.0, 1.0);\n}\n\n// ======================================================\n// MESH GRADIENT\n// ======================================================\n\nvec3 meshGradient(vec2 uv) {\n\n    vec2 p = (uv - 0.5) * uGradientScale;\n    p = rot(uGradientRotation) * p;\n\n    float t = uTime * uGradientMotion;\n    float wob = uGradientWobble;\n\n    vec2 wobA = vec2(\n        sin(t * 1.9),\n        cos(t * 1.9)\n    ) * wob;\n\n    vec2 wobB = vec2(\n        cos(t * 1.9),\n        sin(t * 1.9)\n    ) * wob;\n\n    vec2 c1 = vec2(-0.45, -0.35) + wobA;\n    vec2 c2 = vec2( 0.45, -0.35) + wobB;\n    vec2 c3 = vec2(-0.35,  0.15) + wobA;\n    vec2 c4 = vec2( 0.35,  0.15) + wobB;\n    vec2 c5 = vec2(-0.20,  0.50) + wobA;\n    vec2 c6 = vec2( 0.20,  0.50) + wobB;\n\n    float s = max(0.01, uGradientSoftness);\n\n    float d1 = max(length(p - c1), 0.12);\n    float d2 = max(length(p - c2), 0.12);\n    float d3 = max(length(p - c3), 0.12);\n    float d4 = max(length(p - c4), 0.12);\n    float d5 = max(length(p - c5), 0.12);\n    float d6 = max(length(p - c6), 0.12);\n\n    float w1 = 1.0 / (pow(d1, s) + 0.2);\n    float w2 = 1.0 / (pow(d2, s) + 0.2);\n    float w3 = 1.0 / (pow(d3, s) + 0.2);\n    float w4 = 1.0 / (pow(d4, s) + 0.2);\n    float w5 = 1.0 / (pow(d5, s) + 0.2);\n    float w6 = 1.0 / (pow(d6, s) + 0.2);\n\n    float total = w1 + w2 + w3 + w4 + w5 + w6;\n\n    vec3 col =\n          uPalette[0] * w1\n        + uPalette[1] * w2\n        + uPalette[2] * w3\n        + uPalette[3] * w4\n        + uPalette[4] * w5\n        + uPalette[5] * w6;\n\n    col /= total;\n\n    float luma = luminance(col);\n\n    float boost = uUseCustomPalette ? 1.0 : 1.35;\n\n    col = mix(\n        vec3(luma),\n        col,\n        boost\n    );\n\n    return clamp(col, 0.0, 1.0);\n}\n\n// ======================================================\n// MAIN\n// ======================================================\n\nvoid main() {\n\n    vec2 uv = vTexCoord;\n    \n    float t = uTime * 0.9;\n\n    float aspect = uResolution.x / uResolution.y;\n\n    vec2 originA = toAspectSpace(uOrigin, aspect);\n\n    float xScale = 1.8;\n    float yScale = 0.65;\n\n    vec2 shapeScale = vec2(\n        mix(1.0, xScale, uRippleShape),\n        mix(1.0, yScale, uRippleShape)\n    );\n\n    // --------------------------------------------------\n    // RIPPLE FIELD\n    // --------------------------------------------------\n\n    vec2 uvA = toAspectSpace(uv, aspect);\n\nvec2 rippleP;\nfloat r;\n\nif (!uTapRippleMode) {\n\n    vec2 p = uvA - originA;\n\n    rippleP = p * shapeScale;\n\n    r = length(rippleP);\n\n} else {\n\n    r = 99999.0;\n    rippleP = vec2(0.0);\n\n    for (int i = 0; i < MAX_RIPPLES; i++) {\n\n        if (i >= uRippleCount) break;\n\n        vec2 sourceA =\n            toAspectSpace(\n                uRipplePoints[i],\n                aspect\n            );\n\n        vec2 localP =\n            (uvA - sourceA) *\n            shapeScale;\n\n        float localR =\n            length(localP);\n\n        if (localR < r) {\n\n            r = localR;\n            rippleP = localP;\n        }\n    }\n\n    if (uRippleCount == 0) {\n        r = 1000.0;\n    }\n}\n\n    float angularWarp =\n        sin(rippleP.x * 2.7 + rippleP.y * 1.3) *\n        cos(rippleP.y * 2.1 - rippleP.x * 1.7);\n\n    r += angularWarp * 0.006;\n\n    float circularNoise =\n        sin(r * 12.0 - t * 2.0) * 0.04;\n\n    float ovalNoise =\n        sin(rippleP.x * 5.0 + t) * 0.085 +\n        cos(rippleP.y * 5.0 - t) * 0.015;\n\n    r += mix(\n        circularNoise,\n        ovalNoise,\n        uRippleShape\n    );\n\n    float rippleNoise =\n        sin(rippleP.x * 18.0 + t * 1.2) *\n        cos(rippleP.y * 18.0 - t * 0.9);\n\n    rippleNoise +=\n        sin((rippleP.x + rippleP.y) * 25.0 - t);\n\n    r += rippleNoise * 0.03 * uRippleNoise;\n\n    float gappedR =\n        pow(max(r, 0.0001), uRippleGap);\n\n    float ripplePhase =\n        gappedR * uBands -\n        t * uSpeed;\n\n    float ripple = fract(ripplePhase);\n\n    float seam =\n        abs(ripple - 0.99) * 2.0;\n\n    float seamFade =\n        smoothstep(0.0, 0.98, seam);\n\n    ripple = mix(\n        0.5,\n        ripple,\n        seamFade\n    );\n\n    float rippleSoft =\n        smoothstep(0.1, 0.9, ripple);\n\n    // --------------------------------------------------\n    // FLOW FIELD\n    // --------------------------------------------------\n\n    float flow =\n        sin(uv.x * 5.0 + t) +\n        cos(uv.y * 5.0 - t);\n\n    float flow2 =\n        sin(uv.y * 5.0 - t);\n\n    vec2 rawFlow = vec2(flow, flow2);\n\n    float flowLen =\n        max(length(rawFlow), 0.25);\n\n    vec2 flowDir =\n    rawFlow /\n    max(length(rawFlow), 0.5);\n  \n    \n\n    vec2 displacedUV =\n        clamp(\n            uv +\n            flowDir *\n            uFlowStrength *\n            rippleSoft,\n            0.001,\n            0.999\n        );\n\n    vec2 displacedA =\n        toAspectSpace(\n            displacedUV,\n            aspect\n        );\n\n    vec2 fieldOrigin = originA;\n\nif (uTapRippleMode && uRippleCount > 0) {\n\n    float bestDist = 99999.0;\n\n    for (int i = 0; i < MAX_RIPPLES; i++) {\n\n        if (i >= uRippleCount) break;\n\n        vec2 sourceA =\n            toAspectSpace(\n                uRipplePoints[i],\n                aspect\n            );\n\n        float d =\n            length(\n                displacedA -\n                sourceA\n            );\n\n        if (d < bestDist) {\n\n            bestDist = d;\n            fieldOrigin = sourceA;\n        }\n    }\n}\n\nvec2 shapedSP =\n    (displacedA - fieldOrigin) *\n    shapeScale;\n\n    float radius =\n        length(shapedSP);\n\n    radius +=\n        0.00001 *\n        sin(\n            shapedSP.x * 137.0 +\n            shapedSP.y * 91.0\n        );\n\n    // --------------------------------------------------\n    // SHEAR\n    // --------------------------------------------------\n\n    float shear =\n        sin(\n            uv.y * 10.0 +\n            t * 8.0\n        ) * 0.2;\n\n    float directionalShear =\n        dot(\n            flowDir,\n            normalize(vec2(1.0, -1.0))\n        );\n\n    directionalShear /=\n        (1.0 + abs(directionalShear));\n\n    shear +=\n        directionalShear *\n        uShearStrength;\n\n    // --------------------------------------------------\n    // ACCUMULATION\n    // --------------------------------------------------\n\n    vec3 col = vec3(0.0);\n    float total = 0.0;\n\n    // Loop-invariant terms hoisted out of the tap loop; 21 taps (was 41) \u2014\n    // the taps blur a smooth gradient, so the result is visually the same.\n    float safeRadius = max(radius, 0.08);\n    float lenSP = length(shapedSP);\n    float angularFade = smoothstep(0.03, 0.22, radius);\n    vec2 radialDir = (shapedSP / safeRadius) * angularFade;\n    vec2 tangentDir =\n        (lenSP > 1e-5)\n        ? (vec2(-shapedSP.y, shapedSP.x) / lenSP) * angularFade\n        : vec2(0.0);\n    float swirlBase = 0.01 * sin(radius * 20.0 + t);\n    vec2 invShape = 1.0 / shapeScale;\n\n    for (int i = -10; i <= 10; i++) {\n\n        float f = float(i) / 10.0;\n\n        float swirl =\n            f * 0.085 * rippleSoft +\n            shear * f * 0.038 +\n            swirlBase;\n\n        float radialOffset = f * 0.05 * shear;\n\n        vec2 warped =\n            shapedSP +\n            tangentDir * swirl * 0.8 +\n            radialDir * radialOffset * 0.6;\n\n        warped *= 0.9;\n        warped *= invShape;\n\n        vec2 sampleUV =\n            fromAspectSpace(\n                originA + warped,\n                aspect\n            );\n\n        sampleUV = stabilizeUV(sampleUV);\n\n        float a = 1.0 - abs(f);\n        float w = a * a;\n\n        col += meshGradient(sampleUV) * w;\n\n        total += w;\n    }\n\n    col /= total;\n\n    col =\n        applyColorControls(col);\n\n    gl_FragColor =\n        vec4(col, 1.0);\n}";
export const RIPPLE_VERT = "precision highp float;\n\nattribute vec3 aPosition;\nattribute vec2 aTexCoord;\n\nvarying vec2 vTexCoord;\n\nvoid main() {\n  vTexCoord = aTexCoord;\n\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;\n\n  gl_Position = positionVec4;\n}";
export const RIPPLE_VARIANTS = {
  "hll-application": {
    "colors": [
      "#387dd6",
      "#7887e6",
      "#a182bf",
      "#bf7dc7",
      "#f28a85",
      "#f7262b"
    ],
    "params": {
      "bands": 12.8,
      "speed": 0.31,
      "flow": 0.2,
      "shear": 0.3,
      "shape": 0.0,
      "rippleNoise": 0.0,
      "rippleSpacing": 0.3,
      "ox": 0.5,
      "oy": 0.5,
      "motion": 1.0,
      "soft": 4.0,
      "scale": 5.5,
      "rot": 0.0,
      "wobble": 0.3,
      "saturation": 0.37,
      "vibrancy": 0.54,
      "contrast": 1.65
    }
  },
  "hll-foundation": {
    "colors": [
      "#8f6999",
      "#ba70ba",
      "#e3807d",
      "#ff5c21",
      "#ff874d",
      "#ffb359"
    ],
    "params": {
      "bands": 5.7,
      "speed": 0.9,
      "flow": 0.2,
      "shear": 0.3,
      "shape": 0.0,
      "rippleNoise": 0.0,
      "rippleSpacing": 1.16,
      "ox": 0.5,
      "oy": 0.5,
      "motion": 0.94,
      "soft": 4.0,
      "scale": 5.5,
      "rot": 1.81,
      "wobble": 0.039,
      "saturation": 0.08,
      "vibrancy": 0.13,
      "contrast": 1.31
    }
  },
  "hll-trust-and-governance": {
    "colors": [
      "#78b3e3",
      "#45b0a8",
      "#47ccab",
      "#3dba85",
      "#14ad75",
      "#007345"
    ],
    "params": {
      "bands": 5.7,
      "speed": 0.9,
      "flow": 0.2,
      "shear": 0.3,
      "shape": 0.0,
      "rippleNoise": 0.0,
      "rippleSpacing": 1.16,
      "ox": 0.5,
      "oy": 0.5,
      "motion": 0.94,
      "soft": 4.0,
      "scale": 5.5,
      "rot": 4.58,
      "wobble": 0.039,
      "saturation": 0.0,
      "vibrancy": 0.09,
      "contrast": 2.0
    }
  },
  "hll-people-and-policy": {
    "colors": [
      "#ffd680",
      "#ffdea8",
      "#ffcc94",
      "#ffb378",
      "#ffba99",
      "#ff9445"
    ],
    "params": {
      "bands": 5.7,
      "speed": 0.9,
      "flow": 0.2,
      "shear": 0.3,
      "shape": 0.0,
      "rippleNoise": 0.0,
      "rippleSpacing": 1.16,
      "ox": 0.5,
      "oy": 0.5,
      "motion": 0.94,
      "soft": 4.0,
      "scale": 5.5,
      "rot": 4.16,
      "wobble": 0.039,
      "saturation": 0.0,
      "vibrancy": 0.68,
      "contrast": 1.26
    }
  },
  "hll-ontology": {
    "colors": [
      "#cf9eb0",
      "#bf70a6",
      "#bf7db5",
      "#bf8cc4",
      "#c78aff",
      "#8266ff"
    ],
    "params": {
      "bands": 5.7,
      "speed": 0.9,
      "flow": 0.2,
      "shear": 0.3,
      "shape": 0.0,
      "rippleNoise": 0.0,
      "rippleSpacing": 1.16,
      "ox": 0.5,
      "oy": 0.5,
      "motion": 0.94,
      "soft": 4.0,
      "scale": 5.5,
      "rot": 0.0,
      "wobble": 0.039,
      "saturation": 0.0,
      "vibrancy": 0.67,
      "contrast": 0.97
    }
  },
  "hll-ai": {
    "colors": [
      "#bf9cad",
      "#a399cc",
      "#6e70e0",
      "#8799ed",
      "#7a99fc",
      "#4075fc"
    ],
    "params": {
      "bands": 5.7,
      "speed": 0.9,
      "flow": 0.2,
      "shear": 0.3,
      "shape": 0.0,
      "rippleNoise": 0.0,
      "rippleSpacing": 1.16,
      "ox": 0.5,
      "oy": 0.5,
      "motion": 0.94,
      "soft": 4.0,
      "scale": 5.5,
      "rot": 0.0,
      "wobble": 0.039,
      "saturation": 0.0,
      "vibrancy": 0.31,
      "contrast": 1.27
    }
  }
};
