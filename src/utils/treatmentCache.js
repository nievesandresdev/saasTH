export const getValueResetCache = () => {
    return localStorage.getItem('reset-cache') ?? null;
}

export const addPropertyResetCacheInQuery = (url) => {
    const urlObj = new URL(url);
    //let existResetCache = urlObj.searchParams.get('rc');

    const valueResetCache = getValueResetCache();
    urlObj.searchParams.set('rc', valueResetCache);

    return urlObj.toString();
}