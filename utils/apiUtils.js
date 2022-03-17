import axios from "axios";

export async function getSkyCryptProfile (username) {
    const data = await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${ username }`);
    let arr = [];
    for (const profile in data.data.profiles) {
        arr.push(data.data.profiles[profile].last_save);
    }
    for (const profile in data.data.profiles) {
        if (data.data.profiles[profile].last_save === Math.max(...arr)) {
            return data.data.profiles[profile];
        }
    }
}

export async function getMojangData (username) {
    const data = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${ username }`);
    return data.data;
}

export async function getSlothpixelData (username) {
    const data = await axios.get(`https://api.slothpixel.me/api/skyblock/profile/${ username }`);
    return data.data;
}