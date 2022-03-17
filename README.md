# DISCLAIMER
---
### This bot uses [mineflayer](https://www.npmjs.com/package/mineflayer) which is NOT a normal minecraft client you may get banned if you abuse this, but i been using it for like a year and didn't get banned just don't abuse this to make a pvp bot or something.

## Support
---
I am going to make a support server later check this later, for now you can dm me on discord **MX1D#7609**

---
Read the rest of this to know how to setup the bot a video explaining it coming soon uwu

### Email & Password & Auth
---
The Email is your minecraft account which is probably a microsoft account, and password is also your minecraft account password, **NOT YOUR MAIN ACCOUNT**; the account want to host as the bot, the auth is your minecraft account type (mojang/microsoft) it defaults to microsoft since mojang accounts got disabled,

if you are that kind of people that's like "oh this is gonna steal my account!" you can check mineflayer code and my code both are open source, all the account info goes directly to mojang auth servers

### Token
---
Token is your discord bot token if you didn't make a bot yet make one at [Discord Developers Site](https://discord.com/developers/applications) if you don't know how to make one you can just google it ;-;

### Prefix
---
The prefix is what your commands have to start with example `!stats` in this case the prefix is !

### Admin Tag
---
Admin Tag is the tag of your admin/staff guild rank for example `Guild > [MVP+] MX1D [Admin]: HI!` the tag in this case is `Admin` and this is what you have to put in the config

### Staff
---
The staff array/list is your discord staff members this is needed for the `say` function of the bot here's what i mean

![say](https://cdn.discordapp.com/attachments/850843468938870824/953972107086299146/unknown.png)

you put the ID's for your staff members which are going to be only people that can use this function

### Updates Channel
---
This is the ID of your updates channel, a channel that has all skyblock updates or your guild updates which ever you prefer, i personally use it for skyblock updates here's an example:

![update](https://cdn.discordapp.com/attachments/850843468938870824/953972991606280232/unknown.png)

And here's how it looks in game

![ingame](https://cdn.discordapp.com/attachments/850843468938870824/953973194094690334/unknown.png)

You can leave empty if you don't want this.

### Text Channel
---
The text channel is the channel you want to have the chat linked to, you need to put the channel id for the chat bridge to function here's how it would look:
![chat](https://cdn.discordapp.com/attachments/850843468938870824/953974461244260432/unknown.png)

### API Key
---
This is your hypixel API key, doesn't have to be the bot's API key any key will really work **THIS IS REQUIRED FOR MOST OF THE COMMANDS** *kinda*, to get a key login hypixel and type `/api new` then copy it from there.

### MongoDB
---
This is the database that the bot info will be stored in, this is requried for these commands `Rep, Warn and Ban`, You can check this video explaining how to setup mongoDB 
<iframe width="1223" height="697" src="https://www.youtube.com/embed/rPqRyYJmx2g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Log Channel
---
This channel will include all the bot logs you need to put the channel ID, here's how it would look 
![log](https://cdn.discordapp.com/attachments/850843468938870824/953976657000144946/unknown.png)

if you don't want logs simply leave this empty.

### Guild Name
---
Guild Name is the name of the guild the bot is gonna be in, this is needed for the bot to auto join the guild if it's not in it already

### Guild ID
---
So the **Guild ID** might be confusing for some people to get your guild id simply go to hypixel api https://api.hypixel.net/findGuild?key=YourKey&byUuid=YourUuid and copy the "guild" id from there and paste it in the config file

### Frag
---
This is a true or false, you can allow the players to frag run using the bot along side the commands and the chat bridge, or you can disable it, it's not bannable as some people think since it doesn't really abuse anything but as usual since hypixel is not clear this is **USE AT YOUR OWN RISK**

### Guild Join Stats
---
Sends stats photo when someone joins the guild, this is a true or false, here's how it will look

![joinStats](https://cdn.discordapp.com/attachments/850843468938870824/953978122565476423/unknown.png)


## Notes
---
if you are going to run this bot on your pc make sure to install the font file in the bot folder, but you are probably going to host it i suggest using heroku as it's a free host, this can be hosted same way as discord bots just google how to host a discord bot, this version is way more stable than the first one i learnt alot in coding so code isn't as bad as before and it has way less crashes, also in next update I might add a channel with guild stats in discord like online members, guild level and more, also i want to make photos have an option to enable or disable I spent 50 hours coding this hope it was worth it don't forget to star the repo if you like my work ❤️