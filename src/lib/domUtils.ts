/**
 * Generates a unique CSS selector for a given element.
 * Tries to use ID, then specific classes, then falls back to structural path.
 */
export const getUniqueSelector = (element: HTMLElement): string => {
    // 1. If ID exists, it's the best selector
    if (element.id) {
        return `#${element.id}`;
    }

    // 2. Try using data-attributes if available (common in test ids)
    if (element.hasAttribute('data-testid')) {
        return `[data-testid="${element.getAttribute('data-testid')}"]`;
    }

    // 3. Generate a path based on structure
    const path: string[] = [];
    let current: HTMLElement | null = element;

    while (current && current.tagName !== 'HTML') {
        let selector = current.tagName.toLowerCase();

        if (current.id) {
            selector = `#${current.id}`;
            path.unshift(selector);
            break; // ID is unique, we can stop here
        } else {
            // Find index among siblings of same tag
            let nth = 1;
            let sibling = current.previousElementSibling;
            while (sibling) {
                if (sibling.tagName === current.tagName) {
                    nth++;
                }
                sibling = sibling.previousElementSibling;
            }

            // Append class names if they look unique/meaningful (not Tailwind utility classes ideally, but we work with what we have)
            // For now, let's stick to :nth-of-type for robustness if classes are dynamic
            selector += `:nth-of-type(${nth})`;
        }

        path.unshift(selector);
        current = current.parentElement;
    }

    return path.join(' > ');
};
