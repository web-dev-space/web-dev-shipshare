export function getRandomAvatar(userName) {
    const hash_number = ((userName.charCodeAt(0))) % 10 + 1;
    return require(`../images/randomAvatars/avatar_${hash_number}.jpg`);
}
