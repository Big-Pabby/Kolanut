export const DOTS = "...";

/**
 * Builds a windowed list of page numbers with ellipsis, so long lists don't
 * render one button per page.
 * e.g. getPageRange(7, 20) -> [1, "...", 6, 7, 8, "...", 20]
 */
export const getPageRange = (
  currentPage: number,
  totalPages: number,
  siblings = 1,
): (number | typeof DOTS)[] => {
  // first + last + current + 2 dots + siblings on each side
  const maxSlots = siblings * 2 + 5;

  if (totalPages <= maxSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(currentPage - siblings, 1);
  const right = Math.min(currentPage + siblings, totalPages);

  const showLeftDots = left > 2;
  const showRightDots = right < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const count = siblings * 2 + 3;
    return [
      ...Array.from({ length: count }, (_, i) => i + 1),
      DOTS,
      totalPages,
    ];
  }

  if (showLeftDots && !showRightDots) {
    const count = siblings * 2 + 3;
    return [
      1,
      DOTS,
      ...Array.from({ length: count }, (_, i) => totalPages - count + 1 + i),
    ];
  }

  return [
    1,
    DOTS,
    ...Array.from({ length: right - left + 1 }, (_, i) => left + i),
    DOTS,
    totalPages,
  ];
};
