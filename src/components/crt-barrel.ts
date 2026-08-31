import { BlendFunction, Effect } from "postprocessing";
import { wrapEffect } from "@react-three/postprocessing";
import { Uniform, Vector2 } from "three";

const fragmentShader = /* glsl */ `
uniform float amount;
uniform vec2 aberration;
uniform float time;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 p = uv * 2.0 - 1.0;
  p *= 1.0 + amount * dot(p, p);
  vec2 warped = p * 0.5 + 0.5;

  warped.x += sin(warped.y * 740.0 + time * 1.6) * 0.0011;
  warped.x += sin(time * 0.55) * 0.0014;

  if (warped.x < 0.0 || warped.x > 1.0 || warped.y < 0.0 || warped.y > 1.0) {
    outputColor = vec4(0.0);
    return;
  }

  vec2 cc = uv - 0.5;
  vec2 split = cc * dot(cc, cc) * aberration.x + vec2(aberration.y, 0.0);
  float r = texture2D(inputBuffer, warped + split).r;
  float g = texture2D(inputBuffer, warped).g;
  float b = texture2D(inputBuffer, warped - split).b;
  outputColor = vec4(r, g, b, 1.0);
}
`;

type BarrelOpts = {
  amount?: number;
  aberration?: Vector2 | [number, number];
};

export class BarrelCrtEffect extends Effect {
  constructor({ amount = 0.18, aberration = [0.0028, 0.0012] }: BarrelOpts = {}) {
    const ab =
      aberration instanceof Vector2
        ? aberration.clone()
        : new Vector2(aberration[0], aberration[1]);

    super("BarrelCrtEffect", fragmentShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, Uniform>([
        ["amount", new Uniform(amount)],
        ["aberration", new Uniform(ab)],
        ["time", new Uniform(0)],
      ]),
    });
  }
}

export const BarrelCrt = wrapEffect(BarrelCrtEffect);
