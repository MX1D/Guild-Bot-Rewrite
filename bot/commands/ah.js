import { statsPhoto } from "../../utils/canvasUtils.js";
import { getSkyCryptProfile, getMojangData } from "../../utils/apiUtils.js";

export default {
    name: "ah",
    description: "Auction House stats",
    admin: false,
    excute: async function (bot, args, text, author, client) {
        const player = args[0] || author; // Checking if there's a target or no

        const mojang = await getMojangData(player).catch(e => console.log(e)); // Getting the uuid info
        const data1 = await getSkyCryptProfile(player).catch(e => console.log(e)); // Getting the skyblock profile
        const data = data1.data; // im too lazy to make this look better

        // Auction house stats
        const sales = data?.misc?.auctions_sell || {};
        const earned = toLocaleStringFunction(sales?.gold_earned) || "$0";
        const fees = toLocaleStringFunction(sales?.fees) || "$0";
        const items_sold = sales?.items_sold || "0";
        const buys = data?.misc?.auctions_buy || {};
        const spent = toLocaleStringFunction(buys?.gold_spent) || "$0";
        const bids = buys?.bids || "0";
        const highest_bid = toLocaleStringFunction(buys?.highest_bid) || "$0";

        // a function to put $ and commas so i don't spam it ;-;
        function toLocaleStringFunction (string) {
            if (string)
                return string.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
            else
                return string;
        }
        // info is what's gonna be shown in the photo, it's an array that has a max amount of 8 if you add more it won't render the extra ones
        const info = [{ title: "Earned:", description: earned }, { title: "Spent:", description: spent }, { title: "Fees:", description: fees }, { title: "Items sold:", description: items_sold }, { title: "Bids:", description: bids }, { title: "Highest bid:", description: highest_bid }];
        await statsPhoto(mojang.name, info, mojang.id, client).catch(e => console.log(e)); // Creating the stats photo

    }
};