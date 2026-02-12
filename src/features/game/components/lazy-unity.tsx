"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const UnityGame = dynamic(() => import("./unity-game"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-6">Loading Unity…</div>
  ),
});

type Props = {
  gameId: string;
  buildName?: string;
  compressed?: boolean;
  buildSubpath?: string;
};

export default function LazyUnity({
  gameId,
  buildName = "Build",
  compressed = false,
  buildSubpath,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLoad(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "300px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <div ref={ref} className="h-full w-full">
      {!load ? (
        <div className="flex h-64 items-center justify-center">
          <button
            onClick={() => setLoad(true)}
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Play
          </button>
        </div>
      ) : (
        <UnityGame
          gameId={gameId}
          buildName={buildName}
          compressed={compressed}
          buildSubpath={buildSubpath}
        />
      )}
    </div>
  );
}
