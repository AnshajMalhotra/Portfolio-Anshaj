import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));
const scene = "https://prod.spline.design/PMvTJrhiWQhNVEHL/scene.splinecode";

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="scene-error">
        3D is unavailable right now. You can still get in touch below.
      </p>
    ) : (
      this.props.children
    );
  }
}

export default function ContactScene() {
  const container = useRef(null);
  const app = useRef(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReduced(preference.matches);
      if (preference.matches) {
        app.current?.stop();
        app.current = null;
        setEnabled(false);
        setReady(false);
      }
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        // The scene is optional on touch devices and data-saving connections.
        if (
          entry.isIntersecting &&
          !preference.matches &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          !navigator.connection?.saveData
        )
          setEnabled(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(container.current);
    const syncVisibility = () => setHidden(document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncPreference);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!app.current || !ready) return;
    if (visible && !hidden && !paused && !reduced) app.current.play();
    else app.current.stop();
  }, [visible, hidden, paused, reduced, ready]);

  useEffect(() => {
    if (!enabled || ready) return;
    const timeout = setTimeout(() => setFailed(true), 35000);
    return () => clearTimeout(timeout);
  }, [enabled, ready]);

  return (
    <div
      className={
        ready && !failed ? "contact-scene scene-ready" : "contact-scene"
      }
      ref={container}
    >
      <div className="scene-topline">
        <span>SPACE FOR THE NEXT IDEA</span>
        <span>SPLINE / 3D</span>
      </div>
      <div className="scene-stage">
        <div className="scene-fallback" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit-core" />
        </div>
        {enabled && !failed && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <Spline
                scene={scene}
                renderOnDemand
                onLoad={(application) => {
                  app.current = application;
                  application.setZoom(0.55);
                  setReady(true);
                }}
                className="spline-canvas"
                aria-hidden="true"
              />
            </Suspense>
          </SceneBoundary>
        )}
        {failed && (
          <p className="scene-error">
            3D couldn’t load. The rest of the page is ready.
          </p>
        )}
      </div>
      <div className="scene-controls">
        <span aria-live="polite">
          {reduced
            ? "Still view · Reduced motion"
            : failed
              ? "Still view"
              : ready
                ? "A little room to explore."
                : enabled
                  ? "Loading 3D…"
                  : "A little room to explore."}
        </span>
        {!reduced &&
          !failed &&
          (enabled ? (
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              aria-pressed={paused}
            >
              {paused ? "Resume 3D" : "Pause 3D"}
            </button>
          ) : (
            <button type="button" onClick={() => setEnabled(true)}>
              Explore in 3D ↗
            </button>
          ))}
      </div>
    </div>
  );
}
