/**
 * Merge CSS classes separating them with a space
 * @param classes
 * @return String
 */
export const mergeClasses = (...classes) => classes.filter(className => !!className).join(' ');
