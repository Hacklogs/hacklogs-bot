const Discord = require("discord.js")
const client = new Discord.Client()

const red = "#ff0000"
const green = "#00ff00"
const blue = "#0000ff"


prefix = "hl"


//when bot start
client.on("ready", () => {
  console.log(`${client.user.username} is ready!`)
  client.user.setActivity("hacking tuts", { type: "WATCHING"})
})

//just commands
client.on("message", msg => {
  if(msg.author.bot)return

  if(msg.content == "hl"){
    hlAll = new Discord.RichEmbed()
    .setTitle("please type `hl -h` or `-help` to get info")
    .setColor("#ff0000")

    msg.channel.send(hlAll)
  }
  if(msg.content == prefix + " -h"){
    hlHelp = new Discord.RichEmbed()
    .setTitle ("help")
    .setColor ("#ff0000")
    .addField ('-cmds', 'type ' + prefix + ' `-cmds` or `-commands` to get all commands')

    msg.channel.send(hlHelp)
  }
  if(msg.content == prefix + " -cmds"){
    hlCmds = new Discord.RichEmbed()
    .setTitle("commands")
    .setDescription("Sorry, there is no any commands yet...")
    .setColor("#ff0000")

    msg.channel.send(hlCmds)
  }
})


                                                                //LOGGING\\



//message when new member enters the server and give him role
client.on("guildMemberAdd", member => {
  const welcome_message = `Welcome <@${member.id}> to the english version of the [Hacklogs] server, victim >:З`
  const welcome_channel = client.channels.get("660879339717394432").send(welcome_message)

  console.log('----------- \n New victim entered! \n ----------- \n')

  const welcome_embed = new Discord.RichEmbed()
  .setTitle('Welcome!')
  .setDescription(`Welcome to [Hacklogs] <@${member.id}>! I wish you'll be a good boi >:)`)
  .setThumbnail(member.user.displayAvatarURL)
  .setAuthor(client.user.username, client.user.displayAvatarURL)

  welcome_channel.send(welcome_embed)

  member.addRole(member.guild.roles.find(role => role.name === "victim"))
  console.log('----------- \n Role Added \n ----------- \n')

})

//message when member left the server
client.on("guildMemberRemove", member => {
  const left_message = `<@${member.id}> was hacked`
  const welcome_channel = client.channels.get("660879339717394432").send(left_message)

  const welcome_embed = new Discord.RichEmbed()
  .setTitle('Welcome!')
  .setDescription(`Bye-bye ${member.user.username}#${member.user.discriminator}! I wish you was hacked by some kind kidd :)`)
  .setThumbnail(member.user.displayAvatarURL)
  .setAuthor(client.user.username, client.user.displayAvatarURL)

  welcome_channel.send(left_embed)

  console.log('----------- \n Victim left! \n ----------- \n')
})

client.on("messageDelete",(message) => {
  
  const logs_channel = client.channels.get("661189470753914920")

  console.log("In '" + message.channel.name + "' was deleted '" + message.content + "' at " + Date())

  message_delete = new Discord.RichEmbed()
  .setTitle("MESSAGE DELETED")
  .setColor(red)
  .setDescription(`**In '${message.channel.name}' was deleted message '${message.content}'** \n **Message author is <@${message.author.id}>**`)
  .setTimestamp()

  logs_channel.send(message_delete)
})

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

})

client.login('your super secret TOKEN')
