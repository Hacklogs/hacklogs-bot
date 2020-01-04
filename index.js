const Discord = require("discord.js")
const client = new Discord.Client()

const red = "#ff0000"
const green = "#00ff00"
const blue = "#0000ff"


prefix = "_"


//when bot start
client.on("ready", () => {
  console.log(`${client.user.username} is ready!`)
  client.user.setActivity("porn tuts", { type: "WATCHING"})
})

//just commands
client.on("message", async message => {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if(cmd === "ping") {
    const msg = await message.channel.send(`Pinging...`);
    msg.edit(`Pong! \n Latency is ${Math.floor(msg.createdAt - message.createdAt)}ms \n API latency is ${Math.round(client.ping)}ms`);
  }
});

client.on("message", async (message) => {
  if(message.author.bot)return;
  if(!message.content.startsWith(prefix))return;
  if(!message.member.hasPermission("ADMINISTRATOR", "MANNAGE_MESSAGES"));
  if(!message.guild)return;

  const logs_channel = client.channels.get("661189470753914920")

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //Kick member
  if(cmd === prefix + "kick") {
  
    let kUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
    if(!kUser) return message.channel.send("This user doesn't exist.");
    let kReason = args.join(" ").slice(20);
    if(!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) return message.channel.send("You don't have any acces");
    if(kUser.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) return message.channel.send("This boi can't be kicked")

    message.guild.member(kUser).kick(kReason).catch((err) => console.log(err))

    const kEmbed = new Discord.RichEmbed()
    .setTitle("SOMEONE WAS KICKED!")
    .setColor(red)
    .addField("**kicked user**", kUser, false)
    .addField("**kicked by**", `<@${message.author.id}>`, false)
    .addField("**reason**", kReason)
    .setTimestamp()


    logs_channel.send(kEmbed)

    return;
  }
  //Ban member
  if(cmd === prefix + "ban") {
    let bUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
    if(!bUser) return message.channel.send("This user doesn't exist.");
    let bReason = args.join(" ").slice(20);
    if(!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) return message.channel.send("You don't have any acces");
    if(bUser.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) return message.channel.send("This boi can't be kicked")

    message.guild.member(bUser).ban(bReason).catch((err) => console.log(err))

    const bEmbed = new Discord.RichEmbed()
    .setTitle("SOMEONE WAS BANNED!")
    .setColor(red)
    .addField("**banned user**", bUser, false)
    .addField("**banned by**", `<@${message.author.id}>`, false)
    .addField("**reason**", bReason)
    .setTimestamp()

    logs_channel.send(bEmbed)

    return;
  }
  //Mute member
  if(cmd === prefix + "mute") {
    let mUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
    if(!mUser) return message.channel.send("This user doesn't exist.");
    let mReason = args.join(" ").slice(20);
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have any acces");
    if(mUser.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send("Roles can't be deleted")

    mUser.removeRoles(mUser.roles)
    mUser.addRole("662192530791727124");
  }
  //Unmute member
  if(cmd === prefix + "unmute") {
    let unmUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
    if(!unmUser) return message.channel.send("This user doesn't exist.");
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have any acces");
    if(unmUser.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send("Roles can't be deleted")

    unmUser.removeRole("662192530791727124");
    unmUser.addRole("660845925035671552");
  }
  //clear messages
  if(cmd === prefix + "clear") {

    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send("Messages deleted.").then(msg => msg.delete(3000));
    });
  }


});

//message when new member enters the server and give him role
client.on("guildMemberAdd", member => {
  const welcome_channel = client.channels.get("660879339717394432")

  console.log('----------- \nNew victim entered! \n----------- \n')

  const welcome_embed = new Discord.RichEmbed()
  .setTitle('Welcome!')
  .setDescription(`Welcome to [Hacklogs] <@${member.id}>! I wish you'll be a good boi >:)`)
  .setThumbnail(member.user.displayAvatarURL)
  .setAuthor(client.user.username, client.user.displayAvatarURL)

  welcome_channel.send(welcome_embed)

  member.addRole(member.guild.roles.find(role => role.name === "victim"))
  console.log('----------- \nRole Added \n----------- \n')

});
//message when member left the server
client.on("guildMemberRemove", member => {
  const welcome_channel = client.channels.get("660879339717394432")

  const left_embed = new Discord.RichEmbed()
  .setTitle('BYE!')
  .setDescription(`Bye-bye ${member.user.username}#${member.user.discriminator}! I wish you was hacked by some kind kidd :)`)
  .setThumbnail(member.user.displayAvatarURL)
  .setAuthor(client.user.username, client.user.displayAvatarURL)
  
  welcome_channel.send(left_embed)
  
  console.log('----------- \nVictim left! \n----------- \n')
});
//message when message deleted
client.on("messageDelete",(message) => {
  
  const logs_channel = client.channels.get("661189470753914920")

  console.log("In '" + message.channel.name + "' was deleted '" + message.content + "' at " + Date())

  message_delete = new Discord.RichEmbed()
  .setTitle("MESSAGE DELETED")
  .setColor(red)
  .setDescription(`**In '${message.channel.name}' was deleted message '${message.content}'** \n **Message author is <@${message.author.id}>**`)
  .setTimestamp()

  logs_channel.send(message_delete)
});
//message when message updated/deleted
client.on("messageUpdate", (oldMessage, newMessage) =>{
  if(newMessage.author.bot)return;

  const logs_channel = client.channels.get("661189470753914920")

  message_edit = new Discord.RichEmbed()
  .setTitle("MESSAGE UPDATED")
  .setColor(red)
  .setDescription(`**MESSAGE EDITED \n '${oldMessage.content}' was edited to '${newMessage.content}' \n and message author is <@${newMessage.author.id}>**`)
  .setTimestamp()

  logs_channel.send(message_edit)  

  console.log(`MESSAGE EDITED \n ${oldMessage.content} was edited to ${newMessage.content} \n and message author is <@${newMessage.author.id}>`)

});




client.login('CENSORED');
