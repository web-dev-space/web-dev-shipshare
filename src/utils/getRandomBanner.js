export function getRandomBanner(userName) {
    const hash_number = ((userName.charCodeAt(0))) % 20;
    return require(`../images/randomBanners/banner-${hash_number}.jpg`);
}
