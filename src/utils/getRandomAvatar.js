export function getRandomAvatar(userName) {
    if (!userName || userName.length === 0) {
        return require('../images/randomAvatars/avatar_1.jpg');
    }
    const hash_number = ((userName.charCodeAt(0))) % 10 + 1;
    return require(`../images/randomAvatars/avatar_${hash_number}.jpg`);
}
