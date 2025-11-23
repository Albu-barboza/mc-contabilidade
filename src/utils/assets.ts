/**
 * Resolves the full URL for an asset, taking into account the base URL.
 * Useful for GitHub Pages deployment where the app runs in a subdirectory.
 * 
 * @param path - The absolute path to the asset (e.g., '/images/logo.png')
 * @returns The full URL with base path prepended (e.g., '/mc-contabilidade/images/logo.png')
 */
export const getAssetUrl = (path: string): string => {
    // If path is already a full URL or data URI, return as is
    if (path.startsWith('http') || path.startsWith('data:')) {
        return path;
    }

    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // import.meta.env.BASE_URL already includes the trailing slash
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
