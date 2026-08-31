import { BlendFunction, Effect } from "postprocessing";
import { wrapEffect } from "@react-three/postprocessing";
import { Uniform, Vector2 } from "three";

const fragmentShader = /* glsl */ `
uniform float amount;
uniform float zoom;
uniform vec2 aberration;
uniform float time;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 p = uv * 2.0 - 1.0;
  p *= zoom;
  p *= 1.0 + amount * dot(p, p);
  vec2 warped = p * 0.5 + 0.5;

  warped.x += sin(warped.y * 740.0 + time * 1.6) * 0.0011;
  warped.x += sin(time * 0.55) * 0.0014;

  vec2 sampleUv = clamp(warped, 0.001, 0.999);
  vec2 cc = uv - 0.5;
  vec2 split = cc * dot(cc, cc) * aberration.x + vec2(aberration.y, 0.0);
  float r = texture2D(inputBuffer, sampleUv + split).r;
  float g = texture2D(inputBuffer, sampleUv).g;
  float b = texture2D(inputBuffer, sampleUv - split).b;

  float fadeX = smoothstep(0.0, 0.14, warped.x) * smoothstep(0.0, 0.14, 1.0 - warped.x);
  float fadeY = smoothstep(-0.06, 0.08, warped.y) * smoothstep(-0.06, 0.08, 1.0 - warped.y);
  float fade = fadeX * fadeY;
  vec3 col = mix(vec3(1.0), vec3(r, g, b), fade);
  outputColor = vec4(col, 1.0);
}
`;

type BarrelOpts = {
  amount?: number;
  zoom?: number;
  aberration?: Vector2 | [number, number];
};

export class BarrelCrtEffect extends Effect {
  constructor({
    amount = 0.18,
    zoom = 0.94,
    aberration = [0.0028, 0.0012],
  }: BarrelOpts = {}) {
    const ab =
      aberration instanceof Vector2
        ? aberration.clone()
        : new Vector2(aberration[0], aberration[1]);

    super("BarrelCrtEffect", fragmentShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, Uniform>([
        ["amount", new Uniform(amount)],
        ["zoom", new Uniform(zoom)],
        ["aberration", new Uniform(ab)],
        ["time", new Uniform(0)],
      ]),
    });
  }
}

export const BarrelCrt = wrapEffect(BarrelCrtEffect);
