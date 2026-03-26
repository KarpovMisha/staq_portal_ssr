'use client';
import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

import styles from "./ActionsDropdown.module.scss";

type ContentRender = (api: { close: () => void; toggle: () => void; open: boolean }) => ReactNode;

interface DropdownProps {
  trigger: ReactNode | ((open: boolean) => ReactNode);
  content: ReactNode | ContentRender;
  dropdownWidth?: number;
  offset?: number;
  onOpenChange?: (open: boolean) => void;
}

export default function ActionsDropdown({
  trigger,
  content,
  dropdownWidth = 200,
  offset = 1,
  onOpenChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top?: number; bottom?: number; right?: number; left?: number }>(
    { left: 0, top: 0 }
  );

  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const setOpenState = useCallback((next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  }, [onOpenChange]);

  const close = useCallback(() => setOpenState(false), [setOpenState]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (anchorRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;
      setOpenState(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open, setOpenState]);

  useEffect(() => {
    if (!open) return;

    const closeOnScroll = () => setOpenState(false);

    window.addEventListener("scroll", closeOnScroll, true);
    return () => window.removeEventListener("scroll", closeOnScroll, true);
  }, [open, setOpenState]);

  const handleToggle = () => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldFlip = spaceBelow < 160 && spaceAbove > spaceBelow;

    const defaultLeft = Math.max(0, rect.left);
    const alignRightLeft = Math.max(0, rect.right - dropdownWidth); // left so menu's right == trigger.right

    const willOverflowRight = rect.left + dropdownWidth > window.innerWidth;
    const willOverflowLeft = rect.right - dropdownWidth < 0;

    if (shouldFlip) {
      const bottom = window.innerHeight - rect.top + offset;
      const left = willOverflowRight ? (willOverflowLeft ? 0 : alignRightLeft) : defaultLeft;
      setPos({ bottom, left });
    } else {
      const top = rect.bottom + offset;
      const left = willOverflowRight ? (willOverflowLeft ? 0 : alignRightLeft) : defaultLeft;
      setPos({ top, left });
    }

    setOpenState(!open);
  };

  const renderedContent =
    typeof content === "function"
      ? (content as ContentRender)({ close, toggle: handleToggle, open })
      : content;

  return (
    <>
      <div
        ref={anchorRef}
        style={{ position: "relative", display: "inline-block" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={handleToggle} style={{ cursor: "pointer" }}>
          {typeof trigger === "function" ? trigger(open) : trigger}
        </div>
      </div>

      {open &&
        createPortal(
          <div
            className={styles.actions_dropdown}
            ref={menuRef}
            style={{
              position: "fixed",
              top: pos.top,
              bottom: pos.bottom,
              left: pos.left,
              minWidth: `${dropdownWidth}px`,
              zIndex: 10000,
              animation: "dropdown-fade 0.15s ease-out",
              transformOrigin: pos.bottom ? "bottom left" : "top left",
            }}
          >
            {renderedContent}
          </div>,
          document.body
        )}
    </>
  );
}
