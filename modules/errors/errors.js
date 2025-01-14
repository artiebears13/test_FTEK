
/**
 * @param {HTMLElement} errorContainer — container element
 * @param {string} message — error message
 */
export function showError(errorContainer, message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove("d-none");
}

/**
 * @param {HTMLElement} errorContainer - container element
 */
export function hideError(errorContainer) {
    errorContainer.textContent = "";
    errorContainer.classList.add("d-none");
}
