export default {
    excute: async function (bot, text, client) {

        if (text.includes("join guild")) {
            bot.chat(`/g join ${ bot.config.guildName }`);
        }

        const filter = ["✎ Mana", "You were spawned in Limbo.", "/limbo for more information.", "unclaimed leveling reward!", "Click here to view it!", "Sending to server", "Welcome to Hypixel SkyBlock!", "Finding player...", "Sending a visit request...", "joined the lobby!", "Click HERE to enter the Tournament Hall!", "You fell into the void."];

        function filterChat () {
            let arr = [];
            filter.forEach(filter => {
                if (text.includes(filter))
                    arr.push(filter);
            });
            if (arr.length > 0) return true;
            else return false;
        }

        if (filterChat()) return;
        else {
            console.log(text);
            if (!bot.config.logChannel) return;
            const channel = client.channels.cache.get(bot.config.logChannel);
            if (text.replace(/ /g, "") === "") return;
            channel.send(text.replace(/@everyone/g, "@/everyone").replace(/@here/g, "@/here")).catch(console.log(""));
        }
    }
};