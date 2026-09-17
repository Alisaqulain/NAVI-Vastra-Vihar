export function wrapIndex(i: number, len: number) {
  return ((i % len) + len) % len;
}

export function offsetFromActive(index: number, active: number, len: number) {
  let d = index - active;
  if (d > len / 2) d -= len;
  if (d < -len / 2) d += len;
  return d;
}

/** Classic coverflow: active card centered, larger, forward in Z; sides rotated toward center */
export function centerCoverflowStyle(
  offset: number,
  reducedMotion: boolean,
  options?: { spacingPx?: number; maxVisible?: number; dramatic?: boolean }
) {
  const spacingPx = options?.spacingPx ?? 168;
  const maxVisible = options?.maxVisible ?? 2;
  const dramatic = options?.dramatic ?? false;
  const abs = Math.abs(offset);
  const hidden = abs > maxVisible;

  if (reducedMotion) {
    const x = offset * spacingPx * 0.85;
    const scale = offset === 0 ? (dramatic ? 1.08 : 1) : 0.82;
    const opacity = hidden ? 0 : offset === 0 ? 1 : 0.55;
    return {
      transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
      opacity,
      zIndex: 30 - abs,
      hidden,
      abs,
    };
  }

  const x = offset * spacingPx;
  const rotateY = -offset * (dramatic ? 48 : 42);
  const translateZ =
    offset === 0 ? (dramatic ? 260 : 140) : (dramatic ? -90 : -70) - abs * (dramatic ? 40 : 35);
  const scale =
    offset === 0 ? (dramatic ? 1.2 : 1.1) : Math.max(0.72, (dramatic ? 0.88 : 0.9) - abs * 0.1);
  const opacity = hidden ? 0 : offset === 0 ? 1 : Math.max(0.45, 0.85 - abs * 0.22);

  return {
    transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: 30 - abs,
    hidden,
    abs,
  };
}

/** @deprecated use centerCoverflowStyle */
export function coverflowTransform(
  offset: number,
  reducedMotion: boolean,
  tight = false
) {
  const abs = Math.abs(offset);
  const hidden = abs > 2;
  const rotMul = tight ? 22 : 28;
  const xMul = tight ? 11 : 14;
  const rotateY = offset * (reducedMotion ? 0 : rotMul);
  const translateX = offset * (reducedMotion ? 0 : xMul);
  const translateZ = abs === 0 ? 48 : -abs * 90;
  const scale = abs === 0 ? 1 : Math.max(0.78, 1 - abs * 0.11);
  const opacity = hidden ? 0 : abs === 0 ? 1 : Math.max(0.4, 1 - abs * 0.22);

  return { rotateY, translateX, translateZ, scale, opacity, hidden, abs };
}
