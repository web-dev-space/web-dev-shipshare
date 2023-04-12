
export function getRandomAvatar(userName) {
    const hash_number = userName.charCodeAt(0) % 24;
    return "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_" + hash_number + ".jpg";
}
