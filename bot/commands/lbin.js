import axios from "axios";
import { findBestMatch } from "string-similarity";

export default {
    name: "lbin",
    description: "Finds lowest price for an item",
    admin: false,
    excute: async function (bot, args) {
        if (!args[0]) return;

        const prices = await axios.get("https://maro.skybrokers.xyz/api/auctions/all").catch(e => console.log(e)); // getting the prices list
        let arr = [];
        for (const i of prices.data.data) {
            arr.push(i.name); // putting all item names in array
        }
        const item1 = findBestMatch(args.join(" "), arr); // getting best matched

        // a function to get the price of best match
        async function getLbin () {
            for (const i of prices.data.data) {
                if (i.name === item1.bestMatch.target) {
                    return { name: i.name, lowestBin: i.lowestBin };
                }
            }
        }

        // sending a msg with the price
        const lbin = await getLbin();
        const { name } = lbin;
        const lowestBin = lbin.lowestBin.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });

        const messages = [`Lowest bin for ${ name } is ${ lowestBin }`, `lbin is ${ lowestBin } for ${ name }`, `Price for ${ name } is ${ lowestBin }`, `Lowest price for ${ name } is ${ lowestBin }`, `Price for ${ name } in lbin is ${ lowestBin }`];
        const message = messages[Math.floor(Math.random() * messages.length)];

        bot.say(`/gc ${ message }`);
    }
};