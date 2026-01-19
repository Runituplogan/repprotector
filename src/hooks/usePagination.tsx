import { useMemo } from "react";

interface UsePaginationProps {
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

export const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  pageSize: totalPageCount,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // If we are in the middle of the page range
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    // If we are at the end of the page range
    if (currentPage > totalPageCount - siblingCount * 2) {
      const leftItemCount = 4 + siblingCount;
      const leftRange = range(
        totalPageCount - leftItemCount + 2,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...leftRange];
    }

    // If we are at the start of the page range
    if (currentPage <= siblingCount * 2) {
      const rightItemCount = 4 + siblingCount;
      const rightRange = range(1, rightItemCount);
      return [...rightRange, DOTS, totalPageCount];
    }
  }, [currentPage, siblingCount, totalPageCount]);

  return paginationRange;
};
