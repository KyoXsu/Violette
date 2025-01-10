import {REST, Routes } from 'discord.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

// --- Création des commandes slash
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  },
  {
    name: 'hello',
    description: 'Replies with Hello, World!',
  }
];

// --- On charge les variables environnement
dotenv.config();
// --- Récupération du token via le fichier de variables environnement
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const rest = new REST({ version: '10' }).setToken(token);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(clientId), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

// --- Création d'un bot simple
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

// --- Ce que font les différentes commandes
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping')
  {
    await interaction.deferReply();
    setTimeout(async () => {
      await interaction.editReply('Pong!');
    }, 500);
  } 
  else if (interaction.commandName === 'hello') {
    await interaction.deferReply();
    setTimeout(async () => {
      await interaction.editReply('Hello World !');
    }, 500);
  }
});

// --- Le bot se connecte via le token
client.login(token);