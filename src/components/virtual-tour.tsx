"use client";

import {
  Expand,
  LoaderCircle,
  LockKeyhole,
  MapPinned,
  MousePointerClick,
  RotateCcw,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TourSceneId = "explanada" | "canchas";

type TourScene = {
  id: TourSceneId;
  name: string;
  label: string;
  description: string;
  config: string;
};

type Pano2VrPlayer = {
  readConfigUrl: (url: string) => void;
};

declare global {
  interface Window {
    pano2vrPlayer?: new (containerId: string) => Pano2VrPlayer;
    pano2vrSkin?: new (player: Pano2VrPlayer, base?: string) => unknown;
  }
}

const CONTAINER_ID = "univamex-recorrido-360";
const PLAYER_SCRIPT = "/recorrido-360/player/js/pano2vr_player.js";
const SKIN_SCRIPT = "/recorrido-360/player/js/skin.js";

export const tourScenes: TourScene[] = [
  {
    id: "explanada",
    name: "Explanada",
    label: "Vista exterior",
    description: "Recorrido visual por la explanada del campus Ciudad Azteca.",
    config: "/recorrido-360/player/armado-1.xml",
  },
  {
    id: "canchas",
    name: "Canchas",
    label: "Area deportiva",
    description: "Vista 360 de las canchas y espacios abiertos del campus.",
    config: "/recorrido-360/player/armado-2.xml",
  },
];

const scriptPromises = new Map<string, Promise<void>>();

function loadScript(src: string) {
  const existing = scriptPromises.get(src);

  if (existing) {
    return existing;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const loadedScript = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );

    if (loadedScript?.dataset.loaded === "true") {
      resolve();
      return;
    }

    const script = loadedScript ?? document.createElement("script");

    script.src = src;
    script.async = false;
    script.dataset.loaded = "false";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));

    if (!loadedScript) {
      document.body.appendChild(script);
    }
  });

  scriptPromises.set(src, promise);
  return promise;
}

function getInitialSceneId(sceneId?: string): TourSceneId {
  return sceneId === "canchas" ? "canchas" : "explanada";
}

export function VirtualTour({ initialSceneId }: { initialSceneId?: string }) {
  const [activeSceneId, setActiveSceneId] = useState<TourSceneId>(() =>
    getInitialSceneId(initialSceneId),
  );
  const [scriptsReady, setScriptsReady] = useState(false);
  const [loadingScene, setLoadingScene] = useState(true);
  const [isInteractive, setIsInteractive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<Pano2VrPlayer | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const activeScene = useMemo(
    () => tourScenes.find((scene) => scene.id === activeSceneId) ?? tourScenes[0],
    [activeSceneId],
  );

  useEffect(() => {
    let cancelled = false;

    async function bootPlayer() {
      try {
        await loadScript(PLAYER_SCRIPT);
        await loadScript(SKIN_SCRIPT);

        if (cancelled) {
          return;
        }

        const container = document.getElementById(CONTAINER_ID);

        if (!container || !window.pano2vrPlayer || !window.pano2vrSkin) {
          throw new Error("El visor 360 no esta disponible en este navegador.");
        }

        container.innerHTML = "";
        const player = new window.pano2vrPlayer(CONTAINER_ID);
        new window.pano2vrSkin(player, "?");
        playerRef.current = player;
        setScriptsReady(true);
      } catch (caughtError) {
        if (!cancelled) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "No se pudo iniciar el recorrido 360.",
          );
          setLoadingScene(false);
        }
      }
    }

    bootPlayer();

    return () => {
      cancelled = true;
      playerRef.current = null;
      const container = document.getElementById(CONTAINER_ID);

      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!scriptsReady || !playerRef.current) {
      return;
    }

    let timer: number | undefined;
    let errorTimer: number | undefined;

    try {
      playerRef.current.readConfigUrl(activeScene.config);
      timer = window.setTimeout(() => setLoadingScene(false), 900);
    } catch {
      errorTimer = window.setTimeout(() => {
        setError("No se pudo cargar esta vista del recorrido.");
        setLoadingScene(false);
      }, 0);
    }

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(errorTimer);
    };
  }, [activeScene.config, scriptsReady]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsInteractive(false);
      }
    }

    function handleFullscreenChange() {
      if (document.fullscreenElement !== wrapperRef.current) {
        setIsInteractive(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  function selectScene(sceneId: TourSceneId) {
    if (sceneId === activeSceneId) {
      return;
    }

    setError(null);
    setLoadingScene(true);
    setActiveSceneId(sceneId);

    const url = new URL(window.location.href);
    url.searchParams.set("vista", sceneId);
    url.hash = "recorrido-360";
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function activateTour() {
    if (loadingScene || error) return;

    setIsInteractive(true);
    requestAnimationFrame(() => wrapperRef.current?.focus({ preventScroll: true }));
  }

  function lockTour() {
    setIsInteractive(false);
  }

  async function enterFullscreen() {
    setIsInteractive(true);
    await wrapperRef.current?.requestFullscreen?.();
    requestAnimationFrame(() => wrapperRef.current?.focus({ preventScroll: true }));
  }

  return (
    <div
      aria-label="Recorrido virtual 360 UNIVAMEX"
      className="border border-[#d9e0ec] bg-white shadow-2xl shadow-slate-950/10"
    >
      <div className="flex flex-col gap-4 border-b border-[#d9e0ec] bg-[#f8fafc] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold text-[#b45309]">
            Recorrido 360
          </p>
          <h2 className="mt-1 font-editorial text-2xl font-semibold leading-snug text-[#04215e]">
            {activeScene.name}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
            {activeScene.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div
            aria-label="Seleccionar vista del recorrido"
            className="grid grid-cols-2 gap-2"
            role="group"
          >
            {tourScenes.map((scene) => {
              const active = scene.id === activeScene.id;

              return (
                <button
                  aria-pressed={active}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]",
                    active
                      ? "border-[#04215e] bg-[#04215e] text-white"
                      : "border-[#cbd5e1] bg-white text-[#04215e] hover:border-[#04215e] hover:bg-[#eff6ff]",
                  )}
                  key={scene.id}
                  type="button"
                  onClick={() => selectScene(scene.id)}
                >
                  <MapPinned aria-hidden="true" className="h-4 w-4" />
                  {scene.name}
                </button>
              );
            })}
          </div>

          <button
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-[#cbd5e1] bg-white px-4 py-2 text-sm font-bold text-[#04215e] transition hover:border-[#04215e] hover:bg-[#eff6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
            type="button"
            onClick={enterFullscreen}
          >
            <Expand aria-hidden="true" className="h-4 w-4" />
            Pantalla completa
          </button>
        </div>
      </div>

      <div
        ref={wrapperRef}
        aria-describedby={!isInteractive ? "tour-interaction-help" : undefined}
        className="relative bg-[#071a3d] focus:outline-none"
        data-interactive={isInteractive ? "true" : "false"}
        tabIndex={-1}
        onPointerLeave={(event) => {
          if (
            isInteractive &&
            event.pointerType !== "touch" &&
            document.fullscreenElement !== wrapperRef.current
          ) {
            lockTour();
          }
        }}
      >
        <div
          id={CONTAINER_ID}
          aria-hidden={!isInteractive}
          className="h-[62dvh] min-h-[430px] w-full overflow-hidden bg-[#071a3d] md:h-[72dvh] md:min-h-[560px]"
          inert={!isInteractive}
        >
          <div className="flex h-full items-center justify-center px-6 text-center text-white">
            Cargando recorrido 360
          </div>
        </div>

        {loadingScene ? (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#071a3d]/72 text-white">
            <div className="inline-flex items-center gap-3 border border-white/20 bg-[#071a3d]/90 px-4 py-3 text-sm font-bold">
              <LoaderCircle
                aria-hidden="true"
                className="h-5 w-5 animate-spin"
              />
              Cargando {activeScene.label.toLowerCase()}
            </div>
          </div>
        ) : null}

        {!isInteractive && !error ? (
          <div className="absolute inset-0 z-30 flex touch-pan-y items-center justify-center bg-[linear-gradient(180deg,rgba(7,26,61,0.24)_0%,rgba(7,26,61,0.68)_100%)] p-5 text-center text-white">
            <div className="max-w-md border border-white/25 bg-[#071a3d]/88 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-sm sm:p-7">
              <MousePointerClick aria-hidden="true" className="mx-auto h-8 w-8 text-[#e7a928]" />
              <p className="mt-4 font-editorial text-2xl font-semibold">
                Explora el campus a tu ritmo
              </p>
              <p className="mt-2 text-sm leading-6 text-white/78" id="tour-interaction-help">
                El recorrido está bloqueado para que puedas seguir desplazándote.
                Actívalo cuando quieras mover la vista o usar el zoom.
              </p>
              <button
                className="mt-5 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 bg-[#e7a928] px-5 text-sm font-bold text-[#071a3d] transition hover:bg-[#f2bd46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70"
                disabled={loadingScene}
                type="button"
                onClick={activateTour}
              >
                <MousePointerClick aria-hidden="true" className="h-4 w-4" />
                {loadingScene ? "Preparando recorrido" : "Haz clic para explorar"}
              </button>
            </div>
          </div>
        ) : null}

        {isInteractive && !error ? (
          <button
            className="absolute right-3 top-3 z-30 inline-flex min-h-11 cursor-pointer items-center gap-2 border border-white/35 bg-[#071a3d]/90 px-4 text-sm font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-[#04215e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:right-4 sm:top-4"
            type="button"
            onClick={lockTour}
          >
            <LockKeyhole aria-hidden="true" className="h-4 w-4 text-[#e7a928]" />
            Bloquear interacción
          </button>
        ) : null}

        {error ? (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#071a3d] p-6 text-center text-white">
            <div className="max-w-md border border-white/20 bg-white/10 p-6">
              <RotateCcw aria-hidden="true" className="mx-auto h-8 w-8" />
              <h3 className="mt-4 text-lg font-bold">
                No se pudo abrir el recorrido
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/78">{error}</p>
              <button
                className="mt-5 inline-flex min-h-11 cursor-pointer items-center justify-center border border-white/40 px-4 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                type="button"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
