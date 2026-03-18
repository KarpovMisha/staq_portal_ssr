'use client';

import { useState } from "react";
import Link from "next/link";
import cn from 'classnames';

import { Icon } from "../../ui/elements";

export function ButtonNavigation({ to, label }) {
  // const navigate = useNavigate();
  return (
    <button
      // onClick={() => navigate(to)}
    >
      {label}<Icon name="ArrowDown" />
    </button>
  );
}

export function SignUpButton() {
  return (
    <button
      // onClick={() => keycloak.register()}
    >
      Sign up<Icon name="ArrowDown" />
    </button>
  );
}

export function LinkNavigation({ to, label }) {
  return <Link href={to}>{label}</Link>
}


export function Tabs({ children }) {
  const items = Array.isArray(children) ? children : [children];
  const [active, setActive] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs-actions">
        {items.map((child, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={cn('tab', { active: active === i })}
          >
            {child.props.label}
          </div>
        ))}
      </div>
      <div className="tabs-content">
        {items[active]}
      </div>
    </div>
  );
}

export function Tab({ children }) {
  return <div>{children}</div>;
}
