"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";

/**
 * Listens for a global "portfolio-reset" event and remounts its subtree on
 * each fire, so all child useReveal observers re-attach and fade-in
 * animations replay. Triggered when the user clicks the navbar brand to
 * scroll back to the top.
 */
export function ResetWrapper({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handler = () => setVersion((v) => v + 1);
    window.addEventListener("portfolio-reset", handler);
    return () => window.removeEventListener("portfolio-reset", handler);
  }, []);

  return <Fragment key={version}>{children}</Fragment>;
}
