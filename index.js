const Discord = require("discord.js")
const client = new Discord.Client()
const token = require("./token.json")

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


//message when new member enters the server and give him role
client.on("guildMemberAdd", member => {
  const welcome_message = `Welcome <@${member.id}> to the english version of the [Hacklogs] server, victim >:З`
  const welcome_channel = client.channels.get("660879339717394432").send(welcome_message)

  const welcome_embed = new Discord.RichEmbed()
  .setTitle('Welcome!')
  .setDescription('')


  member.addRole(member.guild.roles.find(role => role.name === "victim"))
  console.log('\n Role Added')

  console.log('\n New victim entered!')
})

//message when member left the server
client.on("guildMemberRemove", member => {
  const left_message = `<@${member.id}> was hacked`
  const welcome_channel = client.channels.get("660879339717394432").send(left_message)

  console.log('\n Victim left!')
})

client.login('your super secret TOKEN')
