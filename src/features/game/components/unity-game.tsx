"use client";

import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export type UnityGameProps = {
  /**
   * Folder name under `public/unity/<gameId>/...`
   * Example: `blobs` -> assets should be served from `/unity/blobs/...`
   */
  gameId: string;
  /**
   * Unity WebGL build filename prefix.
   * Most builds can be standardized to `Build` (recommended).
   */
  buildName?: string;
  /**
   * Folder name under `public/unity/<gameId>/Build/...`
   * Example: `build` -> assets should be served from `/unity/blobs/build/...`
   */
  buildSubpath?: string;
  /**
   * If your export uses `.unityweb` files (common when compression is enabled),
   * keep this `true`. If your files are plain `.data/.wasm`, set `false`.
   */
  compressed?: boolean;
  className?: string;
};

const UnityGame = ({
  gameId,
  buildName = "Build",
  compressed = true,
  className,
  ...props
}: UnityGameProps) => {
  const buildSubpath = props.buildSubpath ? `/${props.buildSubpath}` : "";

  const buildBase = `/unity/${gameId}/Build${buildSubpath}/${buildName}`;

  const dataUrl = compressed
    ? `${buildBase}.data.unityweb`
    : `${buildBase}.data`;
  const frameworkUrl = compressed
    ? `${buildBase}.framework.js.unityweb`
    : `${buildBase}.framework.js`;
  const codeUrl = compressed
    ? `${buildBase}.wasm.unityweb`
    : `${buildBase}.wasm`;

  const { unityProvider } = useUnityContext({
    loaderUrl: `${buildBase}.loader.js`,
    dataUrl,
    frameworkUrl,
    codeUrl,
  });

  return (
    <div className={className ?? "h-full w-full"}>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default UnityGame;
