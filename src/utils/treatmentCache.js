export const getValueResetCache = (url) => {
    return localStorage.getItem('reset-cache') ?? null;
}

export const addPropertyResetCacheInQuery = (url) => {
    const urlObj = new URL(url);
    let existResetCache = urlObj.searchParams.get('rc');
    if (!existResetCache) {
        const valueResetCache = getValueResetCache(url);
        urlObj.searchParams.set('rc', valueResetCache);
    }
    return urlObj.toString();
}