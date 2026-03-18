'use client';
//TODO: for morkdown pages if we deside to use this
import { useState, ReactNode } from "react";

export function Tabs({ children }: { children: ReactNode }) {
  const items = Array.isArray(children) ? children : [children];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        {items.map((child: any, i) => (
          <button key={i} onClick={() => setActive(i)}>
            {child.props.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        {items[active]}
      </div>
    </div>
  );
}

export function Tab({
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
