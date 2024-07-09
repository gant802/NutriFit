import { useMemo } from "react";

// Helper function to create a range of numbers from start to end
function range(start, end) {
    return Array.from({ length: end - start }, (_, i) => i + start);
}

// Custom hook to create pagination range
export const UsePagination = ({
    totalCount,
    pageSize = 20,
    siblingCount = 1,
    currentPage
}) => {
    const DOTS = "..."; // Constant for ellipsis indicating skipped pages

    // Memoized function to calculate pagination range based on dependencies
    const paginationRange = useMemo(() => {
        // Calculate the total number of pages
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Calculate the total number of page elements to be shown in pagination
        const totalPageNumbers = siblingCount + 5;

        // Case 1: If the total number of pages is less than the number of page elements to be shown
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount + 1);
        }

        // Calculate left and right sibling indices
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        // Determine if we need to show dots for skipped pages
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // Case 2: No left dots to show, but right dots to be shown
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftRange = range(1, 3 + 2 * siblingCount);
            return [...leftRange, DOTS, lastPageIndex];
        }

        // Case 3: No right dots to show, but left dots to be shown
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightRange = range(totalPageCount - (3 + 2 * siblingCount) + 1, totalPageCount + 1);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        // Case 4: Both left and right dots to be shown
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex + 1);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
}
