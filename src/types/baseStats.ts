import { Species, StatsValue } from "~/rngTools";
import { get } from "lodash-es";

const baseStats = {
  Bulbasaur: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 },
  Ivysaur: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 },
  Venusaur: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 },
  Charmander: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 },
  Charmeleon: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 },
  Charizard: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
  Squirtle: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 },
  Wartortle: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 },
  Blastoise: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 },
  Caterpie: { hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45 },
  Metapod: { hp: 50, atk: 20, def: 55, spa: 25, spd: 25, spe: 30 },
  Butterfree: { hp: 60, atk: 45, def: 50, spa: 80, spd: 80, spe: 70 },
  Weedle: { hp: 40, atk: 35, def: 30, spa: 20, spd: 20, spe: 50 },
  Kakuna: { hp: 45, atk: 25, def: 50, spa: 25, spd: 25, spe: 35 },
  Beedrill: { hp: 65, atk: 80, def: 40, spa: 45, spd: 80, spe: 75 },
  Pidgey: { hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56 },
  Pidgeotto: { hp: 63, atk: 60, def: 55, spa: 50, spd: 50, spe: 71 },
  Pidgeot: { hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 91 },
  Rattata: { hp: 30, atk: 56, def: 35, spa: 25, spd: 35, spe: 72 },
  Raticate: { hp: 55, atk: 81, def: 60, spa: 50, spd: 70, spe: 97 },
  Spearow: { hp: 40, atk: 60, def: 30, spa: 31, spd: 31, spe: 70 },
  Fearow: { hp: 65, atk: 90, def: 65, spa: 61, spd: 61, spe: 100 },
  Ekans: { hp: 35, atk: 60, def: 44, spa: 40, spd: 54, spe: 55 },
  Arbok: { hp: 60, atk: 85, def: 69, spa: 65, spd: 79, spe: 80 },
  Pikachu: { hp: 35, atk: 55, def: 30, spa: 50, spd: 40, spe: 90 },
  Raichu: { hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 100 },
  Sandshrew: { hp: 50, atk: 75, def: 85, spa: 20, spd: 30, spe: 40 },
  Sandslash: { hp: 75, atk: 100, def: 110, spa: 45, spd: 55, spe: 65 },
  NidoranF: { hp: 55, atk: 47, def: 52, spa: 40, spd: 40, spe: 41 },
  Nidorina: { hp: 70, atk: 62, def: 67, spa: 55, spd: 55, spe: 56 },
  Nidoqueen: { hp: 90, atk: 82, def: 87, spa: 75, spd: 85, spe: 76 },
  NidoranM: { hp: 46, atk: 57, def: 40, spa: 40, spd: 40, spe: 50 },
  Nidorino: { hp: 61, atk: 72, def: 57, spa: 55, spd: 55, spe: 65 },
  Nidoking: { hp: 81, atk: 92, def: 77, spa: 85, spd: 75, spe: 85 },
  Clefairy: { hp: 70, atk: 45, def: 48, spa: 60, spd: 65, spe: 35 },
  Clefable: { hp: 95, atk: 70, def: 73, spa: 85, spd: 90, spe: 60 },
  Vulpix: { hp: 38, atk: 41, def: 40, spa: 50, spd: 65, spe: 65 },
  Ninetales: { hp: 73, atk: 76, def: 75, spa: 81, spd: 100, spe: 100 },
  Jigglypuff: { hp: 115, atk: 45, def: 20, spa: 45, spd: 25, spe: 20 },
  Wigglytuff: { hp: 140, atk: 70, def: 45, spa: 75, spd: 50, spe: 45 },
  Zubat: { hp: 40, atk: 45, def: 35, spa: 30, spd: 40, spe: 55 },
  Golbat: { hp: 75, atk: 80, def: 70, spa: 65, spd: 75, spe: 90 },
  Oddish: { hp: 45, atk: 50, def: 55, spa: 75, spd: 65, spe: 30 },
  Gloom: { hp: 60, atk: 65, def: 70, spa: 85, spd: 75, spe: 40 },
  Vileplume: { hp: 75, atk: 80, def: 85, spa: 100, spd: 90, spe: 50 },
  Paras: { hp: 35, atk: 70, def: 55, spa: 45, spd: 55, spe: 25 },
  Parasect: { hp: 60, atk: 95, def: 80, spa: 60, spd: 80, spe: 30 },
  Venonat: { hp: 60, atk: 55, def: 50, spa: 40, spd: 55, spe: 45 },
  Venomoth: { hp: 70, atk: 65, def: 60, spa: 90, spd: 75, spe: 90 },
  Diglett: { hp: 10, atk: 55, def: 25, spa: 35, spd: 45, spe: 95 },
  Dugtrio: { hp: 35, atk: 80, def: 50, spa: 50, spd: 70, spe: 120 },
  Meowth: { hp: 40, atk: 45, def: 35, spa: 40, spd: 40, spe: 90 },
  Persian: { hp: 65, atk: 70, def: 60, spa: 65, spd: 65, spe: 115 },
  Psyduck: { hp: 50, atk: 52, def: 48, spa: 65, spd: 50, spe: 55 },
  Golduck: { hp: 80, atk: 82, def: 78, spa: 95, spd: 80, spe: 85 },
  Mankey: { hp: 40, atk: 80, def: 35, spa: 35, spd: 45, spe: 70 },
  Primeape: { hp: 65, atk: 105, def: 60, spa: 60, spd: 70, spe: 95 },
  Growlithe: { hp: 55, atk: 70, def: 45, spa: 70, spd: 50, spe: 60 },
  Arcanine: { hp: 90, atk: 110, def: 80, spa: 100, spd: 80, spe: 95 },
  Poliwag: { hp: 40, atk: 50, def: 40, spa: 40, spd: 40, spe: 90 },
  Poliwhirl: { hp: 65, atk: 65, def: 65, spa: 50, spd: 50, spe: 90 },
  Poliwrath: { hp: 90, atk: 85, def: 95, spa: 70, spd: 90, spe: 70 },
  Abra: { hp: 25, atk: 20, def: 15, spa: 105, spd: 55, spe: 90 },
  Kadabra: { hp: 40, atk: 35, def: 30, spa: 120, spd: 70, spe: 105 },
  Alakazam: { hp: 55, atk: 50, def: 45, spa: 135, spd: 85, spe: 120 },
  Machop: { hp: 70, atk: 80, def: 50, spa: 35, spd: 35, spe: 35 },
  Machoke: { hp: 80, atk: 100, def: 70, spa: 50, spd: 60, spe: 45 },
  Machamp: { hp: 90, atk: 130, def: 80, spa: 65, spd: 85, spe: 55 },
  Bellsprout: { hp: 50, atk: 75, def: 35, spa: 70, spd: 30, spe: 40 },
  Weepinbell: { hp: 65, atk: 90, def: 50, spa: 85, spd: 45, spe: 55 },
  Victreebel: { hp: 80, atk: 105, def: 65, spa: 100, spd: 60, spe: 70 },
  Tentacool: { hp: 40, atk: 40, def: 35, spa: 50, spd: 100, spe: 70 },
  Tentacruel: { hp: 80, atk: 70, def: 65, spa: 80, spd: 120, spe: 100 },
  Geodude: { hp: 40, atk: 80, def: 100, spa: 30, spd: 30, spe: 20 },
  Graveler: { hp: 55, atk: 95, def: 115, spa: 45, spd: 45, spe: 35 },
  Golem: { hp: 80, atk: 110, def: 130, spa: 55, spd: 65, spe: 45 },
  Ponyta: { hp: 50, atk: 85, def: 55, spa: 65, spd: 65, spe: 90 },
  Rapidash: { hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 105 },
  Slowpoke: { hp: 90, atk: 65, def: 65, spa: 40, spd: 40, spe: 15 },
  Slowbro: { hp: 95, atk: 75, def: 110, spa: 100, spd: 80, spe: 30 },
  Magnemite: { hp: 25, atk: 35, def: 70, spa: 95, spd: 55, spe: 45 },
  Magneton: { hp: 50, atk: 60, def: 95, spa: 120, spd: 70, spe: 70 },
  FarfetchD: { hp: 52, atk: 65, def: 55, spa: 58, spd: 62, spe: 60 },
  Doduo: { hp: 35, atk: 85, def: 45, spa: 35, spd: 35, spe: 75 },
  Dodrio: { hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 100 },
  Seel: { hp: 65, atk: 45, def: 55, spa: 45, spd: 70, spe: 45 },
  Dewgong: { hp: 90, atk: 70, def: 80, spa: 70, spd: 95, spe: 70 },
  Grimer: { hp: 80, atk: 80, def: 50, spa: 40, spd: 50, spe: 25 },
  Muk: { hp: 105, atk: 105, def: 75, spa: 65, spd: 100, spe: 50 },
  Shellder: { hp: 30, atk: 65, def: 100, spa: 45, spd: 25, spe: 40 },
  Cloyster: { hp: 50, atk: 95, def: 180, spa: 85, spd: 45, spe: 70 },
  Gastly: { hp: 30, atk: 35, def: 30, spa: 100, spd: 35, spe: 80 },
  Haunter: { hp: 45, atk: 50, def: 45, spa: 115, spd: 55, spe: 95 },
  Gengar: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 },
  Onix: { hp: 35, atk: 45, def: 160, spa: 30, spd: 45, spe: 70 },
  Drowzee: { hp: 60, atk: 48, def: 45, spa: 43, spd: 90, spe: 42 },
  Hypno: { hp: 85, atk: 73, def: 70, spa: 73, spd: 115, spe: 67 },
  Krabby: { hp: 30, atk: 105, def: 90, spa: 25, spd: 25, spe: 50 },
  Kingler: { hp: 55, atk: 130, def: 115, spa: 50, spd: 50, spe: 75 },
  Voltorb: { hp: 40, atk: 30, def: 50, spa: 55, spd: 55, spe: 100 },
  Electrode: { hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 140 },
  Exeggcute: { hp: 60, atk: 40, def: 80, spa: 60, spd: 45, spe: 40 },
  Exeggutor: { hp: 95, atk: 95, def: 85, spa: 125, spd: 65, spe: 55 },
  Cubone: { hp: 50, atk: 50, def: 95, spa: 40, spd: 50, spe: 35 },
  Marowak: { hp: 60, atk: 80, def: 110, spa: 50, spd: 80, spe: 45 },
  Hitmonlee: { hp: 50, atk: 120, def: 53, spa: 35, spd: 110, spe: 87 },
  Hitmonchan: { hp: 50, atk: 105, def: 79, spa: 35, spd: 110, spe: 76 },
  Lickitung: { hp: 90, atk: 55, def: 75, spa: 60, spd: 75, spe: 30 },
  Koffing: { hp: 40, atk: 65, def: 95, spa: 60, spd: 45, spe: 35 },
  Weezing: { hp: 65, atk: 90, def: 120, spa: 85, spd: 70, spe: 60 },
  Rhyhorn: { hp: 80, atk: 85, def: 95, spa: 30, spd: 30, spe: 25 },
  Rhydon: { hp: 105, atk: 130, def: 120, spa: 45, spd: 45, spe: 40 },
  Chansey: { hp: 250, atk: 5, def: 5, spa: 35, spd: 105, spe: 50 },
  Tangela: { hp: 65, atk: 55, def: 115, spa: 100, spd: 40, spe: 60 },
  Kangaskhan: { hp: 105, atk: 95, def: 80, spa: 40, spd: 80, spe: 90 },
  Horsea: { hp: 30, atk: 40, def: 70, spa: 70, spd: 25, spe: 60 },
  Seadra: { hp: 55, atk: 65, def: 95, spa: 95, spd: 45, spe: 85 },
  Goldeen: { hp: 45, atk: 67, def: 60, spa: 35, spd: 50, spe: 63 },
  Seaking: { hp: 80, atk: 92, def: 65, spa: 65, spd: 80, spe: 68 },
  Staryu: { hp: 30, atk: 45, def: 55, spa: 70, spd: 55, spe: 85 },
  Starmie: { hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115 },
  MrMime: { hp: 40, atk: 45, def: 65, spa: 100, spd: 120, spe: 90 },
  Scyther: { hp: 70, atk: 110, def: 80, spa: 55, spd: 80, spe: 105 },
  Jynx: { hp: 65, atk: 50, def: 35, spa: 115, spd: 95, spe: 95 },
  Electabuzz: { hp: 65, atk: 83, def: 57, spa: 95, spd: 85, spe: 105 },
  Magmar: { hp: 65, atk: 95, def: 57, spa: 100, spd: 85, spe: 93 },
  Pinsir: { hp: 65, atk: 125, def: 100, spa: 55, spd: 70, spe: 85 },
  Tauros: { hp: 75, atk: 100, def: 95, spa: 40, spd: 70, spe: 110 },
  Magikarp: { hp: 20, atk: 10, def: 55, spa: 15, spd: 20, spe: 80 },
  Gyarados: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 },
  Lapras: { hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60 },
  Ditto: { hp: 48, atk: 48, def: 48, spa: 48, spd: 48, spe: 48 },
  Eevee: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 },
  Vaporeon: { hp: 130, atk: 65, def: 60, spa: 110, spd: 95, spe: 65 },
  Jolteon: { hp: 65, atk: 65, def: 60, spa: 110, spd: 95, spe: 130 },
  Flareon: { hp: 65, atk: 130, def: 60, spa: 95, spd: 110, spe: 65 },
  Porygon: { hp: 65, atk: 60, def: 70, spa: 85, spd: 75, spe: 40 },
  Omanyte: { hp: 35, atk: 40, def: 100, spa: 90, spd: 55, spe: 35 },
  Omastar: { hp: 70, atk: 60, def: 125, spa: 115, spd: 70, spe: 55 },
  Kabuto: { hp: 30, atk: 80, def: 90, spa: 55, spd: 45, spe: 55 },
  Kabutops: { hp: 60, atk: 115, def: 105, spa: 65, spd: 70, spe: 80 },
  Aerodactyl: { hp: 80, atk: 105, def: 65, spa: 60, spd: 75, spe: 130 },
  Snorlax: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 },
  Articuno: { hp: 90, atk: 85, def: 100, spa: 95, spd: 125, spe: 85 },
  Zapdos: { hp: 90, atk: 90, def: 85, spa: 125, spd: 90, spe: 100 },
  Moltres: { hp: 90, atk: 100, def: 90, spa: 125, spd: 85, spe: 90 },
  Dratini: { hp: 41, atk: 64, def: 45, spa: 50, spd: 50, spe: 50 },
  Dragonair: { hp: 61, atk: 84, def: 65, spa: 70, spd: 70, spe: 70 },
  Dragonite: { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 },
  Mewtwo: { hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 },
  Mew: { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 },
  Chikorita: { hp: 45, atk: 49, def: 65, spa: 49, spd: 65, spe: 45 },
  Bayleef: { hp: 60, atk: 62, def: 80, spa: 63, spd: 80, spe: 60 },
  Meganium: { hp: 80, atk: 82, def: 100, spa: 83, spd: 100, spe: 80 },
  Cyndaquil: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 },
  Quilava: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 },
  Typhlosion: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
  Totodile: { hp: 50, atk: 65, def: 64, spa: 44, spd: 48, spe: 43 },
  Croconaw: { hp: 65, atk: 80, def: 80, spa: 59, spd: 63, spe: 58 },
  Feraligatr: { hp: 85, atk: 105, def: 100, spa: 79, spd: 83, spe: 78 },
  Sentret: { hp: 35, atk: 46, def: 34, spa: 35, spd: 45, spe: 20 },
  Furret: { hp: 85, atk: 76, def: 64, spa: 45, spd: 55, spe: 90 },
  Hoothoot: { hp: 60, atk: 30, def: 30, spa: 36, spd: 56, spe: 50 },
  Noctowl: { hp: 100, atk: 50, def: 50, spa: 76, spd: 96, spe: 70 },
  Ledyba: { hp: 40, atk: 20, def: 30, spa: 40, spd: 80, spe: 55 },
  Ledian: { hp: 55, atk: 35, def: 50, spa: 55, spd: 110, spe: 85 },
  Spinarak: { hp: 40, atk: 60, def: 40, spa: 40, spd: 40, spe: 30 },
  Ariados: { hp: 70, atk: 90, def: 70, spa: 60, spd: 60, spe: 40 },
  Crobat: { hp: 85, atk: 90, def: 80, spa: 70, spd: 80, spe: 130 },
  Chinchou: { hp: 75, atk: 38, def: 38, spa: 56, spd: 56, spe: 67 },
  Lanturn: { hp: 125, atk: 58, def: 58, spa: 76, spd: 76, spe: 67 },
  Pichu: { hp: 20, atk: 40, def: 15, spa: 35, spd: 35, spe: 60 },
  Cleffa: { hp: 50, atk: 25, def: 28, spa: 45, spd: 55, spe: 15 },
  Igglybuff: { hp: 90, atk: 30, def: 15, spa: 40, spd: 20, spe: 15 },
  Togepi: { hp: 35, atk: 20, def: 65, spa: 40, spd: 65, spe: 20 },
  Togetic: { hp: 55, atk: 40, def: 85, spa: 80, spd: 105, spe: 40 },
  Natu: { hp: 40, atk: 50, def: 45, spa: 70, spd: 45, spe: 70 },
  Xatu: { hp: 65, atk: 75, def: 70, spa: 95, spd: 70, spe: 95 },
  Mareep: { hp: 55, atk: 40, def: 40, spa: 65, spd: 45, spe: 35 },
  Flaaffy: { hp: 70, atk: 55, def: 55, spa: 80, spd: 60, spe: 45 },
  Ampharos: { hp: 90, atk: 75, def: 75, spa: 115, spd: 90, spe: 55 },
  Bellossom: { hp: 75, atk: 80, def: 85, spa: 90, spd: 100, spe: 50 },
  Marill: { hp: 70, atk: 20, def: 50, spa: 20, spd: 50, spe: 40 },
  Azumarill: { hp: 100, atk: 50, def: 80, spa: 50, spd: 80, spe: 50 },
  Sudowoodo: { hp: 70, atk: 100, def: 115, spa: 30, spd: 65, spe: 30 },
  Politoed: { hp: 90, atk: 75, def: 75, spa: 90, spd: 100, spe: 70 },
  Hoppip: { hp: 35, atk: 35, def: 40, spa: 35, spd: 55, spe: 50 },
  Skiploom: { hp: 55, atk: 45, def: 50, spa: 45, spd: 65, spe: 80 },
  Jumpluff: { hp: 75, atk: 55, def: 70, spa: 55, spd: 85, spe: 110 },
  Aipom: { hp: 55, atk: 70, def: 55, spa: 40, spd: 55, spe: 85 },
  Sunkern: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
  Sunflora: { hp: 75, atk: 75, def: 55, spa: 105, spd: 85, spe: 30 },
  Yanma: { hp: 65, atk: 65, def: 45, spa: 75, spd: 45, spe: 95 },
  Wooper: { hp: 55, atk: 45, def: 45, spa: 25, spd: 25, spe: 15 },
  Quagsire: { hp: 95, atk: 85, def: 85, spa: 65, spd: 65, spe: 35 },
  Espeon: { hp: 65, atk: 65, def: 60, spa: 130, spd: 95, spe: 110 },
  Umbreon: { hp: 95, atk: 65, def: 110, spa: 60, spd: 130, spe: 65 },
  Murkrow: { hp: 60, atk: 85, def: 42, spa: 85, spd: 42, spe: 91 },
  Slowking: { hp: 95, atk: 75, def: 80, spa: 100, spd: 110, spe: 30 },
  Misdreavus: { hp: 60, atk: 60, def: 60, spa: 85, spd: 85, spe: 85 },
  Unown: { hp: 48, atk: 72, def: 48, spa: 72, spd: 48, spe: 48 },
  Wobbuffet: { hp: 190, atk: 33, def: 58, spa: 33, spd: 58, spe: 33 },
  Girafarig: { hp: 70, atk: 80, def: 65, spa: 90, spd: 65, spe: 85 },
  Pineco: { hp: 50, atk: 65, def: 90, spa: 35, spd: 35, spe: 15 },
  Forretress: { hp: 75, atk: 90, def: 140, spa: 60, spd: 60, spe: 40 },
  Dunsparce: { hp: 100, atk: 70, def: 70, spa: 65, spd: 65, spe: 45 },
  Gligar: { hp: 65, atk: 75, def: 105, spa: 35, spd: 65, spe: 85 },
  Steelix: { hp: 75, atk: 85, def: 200, spa: 55, spd: 65, spe: 30 },
  Snubbull: { hp: 60, atk: 80, def: 50, spa: 40, spd: 40, spe: 30 },
  Granbull: { hp: 90, atk: 120, def: 75, spa: 60, spd: 60, spe: 45 },
  Qwilfish: { hp: 65, atk: 95, def: 75, spa: 55, spd: 55, spe: 85 },
  Scizor: { hp: 70, atk: 130, def: 100, spa: 55, spd: 80, spe: 65 },
  Shuckle: { hp: 20, atk: 10, def: 230, spa: 10, spd: 230, spe: 5 },
  Heracross: { hp: 80, atk: 125, def: 75, spa: 40, spd: 95, spe: 85 },
  Sneasel: { hp: 55, atk: 95, def: 55, spa: 35, spd: 75, spe: 115 },
  Teddiursa: { hp: 60, atk: 80, def: 50, spa: 50, spd: 50, spe: 40 },
  Ursaring: { hp: 90, atk: 130, def: 75, spa: 75, spd: 75, spe: 55 },
  Slugma: { hp: 40, atk: 40, def: 40, spa: 70, spd: 40, spe: 20 },
  Magcargo: { hp: 50, atk: 50, def: 120, spa: 80, spd: 80, spe: 30 },
  Swinub: { hp: 50, atk: 50, def: 40, spa: 30, spd: 30, spe: 50 },
  Piloswine: { hp: 100, atk: 100, def: 80, spa: 60, spd: 60, spe: 50 },
  Corsola: { hp: 55, atk: 55, def: 85, spa: 65, spd: 85, spe: 35 },
  Remoraid: { hp: 35, atk: 65, def: 35, spa: 65, spd: 35, spe: 65 },
  Octillery: { hp: 75, atk: 105, def: 75, spa: 105, spd: 75, spe: 45 },
  Delibird: { hp: 45, atk: 55, def: 45, spa: 65, spd: 45, spe: 75 },
  Mantine: { hp: 65, atk: 40, def: 70, spa: 80, spd: 140, spe: 70 },
  Skarmory: { hp: 65, atk: 80, def: 140, spa: 40, spd: 70, spe: 70 },
  Houndour: { hp: 45, atk: 60, def: 30, spa: 80, spd: 50, spe: 65 },
  Houndoom: { hp: 75, atk: 90, def: 50, spa: 110, spd: 80, spe: 95 },
  Kingdra: { hp: 75, atk: 95, def: 95, spa: 95, spd: 95, spe: 85 },
  Phanpy: { hp: 90, atk: 60, def: 60, spa: 40, spd: 40, spe: 40 },
  Donphan: { hp: 90, atk: 120, def: 120, spa: 60, spd: 60, spe: 50 },
  Porygon2: { hp: 85, atk: 80, def: 90, spa: 105, spd: 95, spe: 60 },
  Stantler: { hp: 73, atk: 95, def: 62, spa: 85, spd: 65, spe: 85 },
  Smeargle: { hp: 55, atk: 20, def: 35, spa: 20, spd: 45, spe: 75 },
  Tyrogue: { hp: 35, atk: 35, def: 35, spa: 35, spd: 35, spe: 35 },
  Hitmontop: { hp: 50, atk: 95, def: 95, spa: 35, spd: 110, spe: 70 },
  Smoochum: { hp: 45, atk: 30, def: 15, spa: 85, spd: 65, spe: 65 },
  Elekid: { hp: 45, atk: 63, def: 37, spa: 65, spd: 55, spe: 95 },
  Magby: { hp: 45, atk: 75, def: 37, spa: 70, spd: 55, spe: 83 },
  Miltank: { hp: 95, atk: 80, def: 105, spa: 40, spd: 70, spe: 100 },
  Blissey: { hp: 255, atk: 10, def: 10, spa: 75, spd: 135, spe: 55 },
  Raikou: { hp: 90, atk: 85, def: 75, spa: 115, spd: 100, spe: 115 },
  Entei: { hp: 115, atk: 115, def: 85, spa: 90, spd: 75, spe: 100 },
  Suicune: { hp: 100, atk: 75, def: 115, spa: 90, spd: 115, spe: 85 },
  Larvitar: { hp: 50, atk: 64, def: 50, spa: 45, spd: 50, spe: 41 },
  Pupitar: { hp: 70, atk: 84, def: 70, spa: 65, spd: 70, spe: 51 },
  Tyranitar: { hp: 100, atk: 134, def: 110, spa: 95, spd: 100, spe: 61 },
  Lugia: { hp: 106, atk: 90, def: 130, spa: 90, spd: 154, spe: 110 },
  HoOh: { hp: 106, atk: 130, def: 90, spa: 110, spd: 154, spe: 90 },
  Celebi: { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 },
  Treecko: { hp: 40, atk: 45, def: 35, spa: 65, spd: 55, spe: 70 },
  Grovyle: { hp: 50, atk: 65, def: 45, spa: 85, spd: 65, spe: 95 },
  Sceptile: { hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120 },
  Torchic: { hp: 45, atk: 60, def: 40, spa: 70, spd: 50, spe: 45 },
  Combusken: { hp: 60, atk: 85, def: 60, spa: 85, spd: 60, spe: 55 },
  Blaziken: { hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80 },
  Mudkip: { hp: 50, atk: 70, def: 50, spa: 50, spd: 50, spe: 40 },
  Marshtomp: { hp: 70, atk: 85, def: 70, spa: 60, spd: 70, spe: 50 },
  Swampert: { hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60 },
  Poochyena: { hp: 35, atk: 55, def: 35, spa: 30, spd: 30, spe: 35 },
  Mightyena: { hp: 70, atk: 90, def: 70, spa: 60, spd: 60, spe: 70 },
  Zigzagoon: { hp: 38, atk: 30, def: 41, spa: 30, spd: 41, spe: 60 },
  Linoone: { hp: 78, atk: 70, def: 61, spa: 50, spd: 61, spe: 100 },
  Wurmple: { hp: 45, atk: 45, def: 35, spa: 20, spd: 30, spe: 20 },
  Silcoon: { hp: 50, atk: 35, def: 55, spa: 25, spd: 25, spe: 15 },
  Beautifly: { hp: 60, atk: 70, def: 50, spa: 90, spd: 50, spe: 65 },
  Cascoon: { hp: 50, atk: 35, def: 55, spa: 25, spd: 25, spe: 15 },
  Dustox: { hp: 60, atk: 50, def: 70, spa: 50, spd: 90, spe: 65 },
  Lotad: { hp: 40, atk: 30, def: 30, spa: 40, spd: 50, spe: 30 },
  Lombre: { hp: 60, atk: 50, def: 50, spa: 60, spd: 70, spe: 50 },
  Ludicolo: { hp: 80, atk: 70, def: 70, spa: 90, spd: 100, spe: 70 },
  Seedot: { hp: 40, atk: 40, def: 50, spa: 30, spd: 30, spe: 30 },
  Nuzleaf: { hp: 70, atk: 70, def: 40, spa: 60, spd: 40, spe: 60 },
  Shiftry: { hp: 90, atk: 100, def: 60, spa: 90, spd: 60, spe: 80 },
  Taillow: { hp: 40, atk: 55, def: 30, spa: 30, spd: 30, spe: 85 },
  Swellow: { hp: 60, atk: 85, def: 60, spa: 50, spd: 50, spe: 125 },
  Wingull: { hp: 40, atk: 30, def: 30, spa: 55, spd: 30, spe: 85 },
  Pelipper: { hp: 60, atk: 50, def: 100, spa: 85, spd: 70, spe: 65 },
  Ralts: { hp: 28, atk: 25, def: 25, spa: 45, spd: 35, spe: 40 },
  Kirlia: { hp: 38, atk: 35, def: 35, spa: 65, spd: 55, spe: 50 },
  Gardevoir: { hp: 68, atk: 65, def: 65, spa: 125, spd: 115, spe: 80 },
  Surskit: { hp: 40, atk: 30, def: 32, spa: 50, spd: 52, spe: 65 },
  Masquerain: { hp: 70, atk: 60, def: 62, spa: 80, spd: 82, spe: 60 },
  Shroomish: { hp: 60, atk: 40, def: 60, spa: 40, spd: 60, spe: 35 },
  Breloom: { hp: 60, atk: 130, def: 80, spa: 60, spd: 60, spe: 70 },
  Slakoth: { hp: 60, atk: 60, def: 60, spa: 35, spd: 35, spe: 30 },
  Vigoroth: { hp: 80, atk: 80, def: 80, spa: 55, spd: 55, spe: 90 },
  Slaking: { hp: 150, atk: 160, def: 100, spa: 95, spd: 65, spe: 100 },
  Nincada: { hp: 31, atk: 45, def: 90, spa: 30, spd: 30, spe: 40 },
  Ninjask: { hp: 61, atk: 90, def: 45, spa: 50, spd: 50, spe: 160 },
  Shedinja: { hp: 1, atk: 90, def: 45, spa: 30, spd: 30, spe: 40 },
  Whismur: { hp: 64, atk: 51, def: 23, spa: 51, spd: 23, spe: 28 },
  Loudred: { hp: 84, atk: 71, def: 43, spa: 71, spd: 43, spe: 48 },
  Exploud: { hp: 104, atk: 91, def: 63, spa: 91, spd: 63, spe: 68 },
  Makuhita: { hp: 72, atk: 60, def: 30, spa: 20, spd: 30, spe: 25 },
  Hariyama: { hp: 144, atk: 120, def: 60, spa: 40, spd: 60, spe: 50 },
  Azurill: { hp: 50, atk: 20, def: 40, spa: 20, spd: 40, spe: 20 },
  Nosepass: { hp: 30, atk: 45, def: 135, spa: 45, spd: 90, spe: 30 },
  Skitty: { hp: 50, atk: 45, def: 45, spa: 35, spd: 35, spe: 50 },
  Delcatty: { hp: 70, atk: 65, def: 65, spa: 55, spd: 55, spe: 70 },
  Sableye: { hp: 50, atk: 75, def: 75, spa: 65, spd: 65, spe: 50 },
  Mawile: { hp: 50, atk: 85, def: 85, spa: 55, spd: 55, spe: 50 },
  Aron: { hp: 50, atk: 70, def: 100, spa: 40, spd: 40, spe: 30 },
  Lairon: { hp: 60, atk: 90, def: 140, spa: 50, spd: 50, spe: 40 },
  Aggron: { hp: 70, atk: 110, def: 180, spa: 60, spd: 60, spe: 50 },
  Meditite: { hp: 30, atk: 40, def: 55, spa: 40, spd: 55, spe: 60 },
  Medicham: { hp: 60, atk: 60, def: 75, spa: 60, spd: 75, spe: 80 },
  Electrike: { hp: 40, atk: 45, def: 40, spa: 65, spd: 40, spe: 65 },
  Manectric: { hp: 70, atk: 75, def: 60, spa: 105, spd: 60, spe: 105 },
  Plusle: { hp: 60, atk: 50, def: 40, spa: 85, spd: 75, spe: 95 },
  Minun: { hp: 60, atk: 40, def: 50, spa: 75, spd: 85, spe: 95 },
  Volbeat: { hp: 65, atk: 73, def: 55, spa: 47, spd: 75, spe: 85 },
  Illumise: { hp: 65, atk: 47, def: 55, spa: 73, spd: 75, spe: 85 },
  Roselia: { hp: 50, atk: 60, def: 45, spa: 100, spd: 80, spe: 65 },
  Gulpin: { hp: 70, atk: 43, def: 53, spa: 43, spd: 53, spe: 40 },
  Swalot: { hp: 100, atk: 73, def: 83, spa: 73, spd: 83, spe: 55 },
  Carvanha: { hp: 45, atk: 90, def: 20, spa: 65, spd: 20, spe: 65 },
  Sharpedo: { hp: 70, atk: 120, def: 40, spa: 95, spd: 40, spe: 95 },
  Wailmer: { hp: 130, atk: 70, def: 35, spa: 70, spd: 35, spe: 60 },
  Wailord: { hp: 170, atk: 90, def: 45, spa: 90, spd: 45, spe: 60 },
  Numel: { hp: 60, atk: 60, def: 40, spa: 65, spd: 45, spe: 35 },
  Camerupt: { hp: 70, atk: 100, def: 70, spa: 105, spd: 75, spe: 40 },
  Torkoal: { hp: 70, atk: 85, def: 140, spa: 85, spd: 70, spe: 20 },
  Spoink: { hp: 60, atk: 25, def: 35, spa: 70, spd: 80, spe: 60 },
  Grumpig: { hp: 80, atk: 45, def: 65, spa: 90, spd: 110, spe: 80 },
  Spinda: { hp: 60, atk: 60, def: 60, spa: 60, spd: 60, spe: 60 },
  Trapinch: { hp: 45, atk: 100, def: 45, spa: 45, spd: 45, spe: 10 },
  Vibrava: { hp: 50, atk: 70, def: 50, spa: 50, spd: 50, spe: 70 },
  Flygon: { hp: 80, atk: 100, def: 80, spa: 80, spd: 80, spe: 100 },
  Cacnea: { hp: 50, atk: 85, def: 40, spa: 85, spd: 40, spe: 35 },
  Cacturne: { hp: 70, atk: 115, def: 60, spa: 115, spd: 60, spe: 55 },
  Swablu: { hp: 45, atk: 40, def: 60, spa: 40, spd: 75, spe: 50 },
  Altaria: { hp: 75, atk: 70, def: 90, spa: 70, spd: 105, spe: 80 },
  Zangoose: { hp: 73, atk: 115, def: 60, spa: 60, spd: 60, spe: 90 },
  Seviper: { hp: 73, atk: 100, def: 60, spa: 100, spd: 60, spe: 65 },
  Lunatone: { hp: 70, atk: 55, def: 65, spa: 95, spd: 85, spe: 70 },
  Solrock: { hp: 70, atk: 95, def: 85, spa: 55, spd: 65, spe: 70 },
  Barboach: { hp: 50, atk: 48, def: 43, spa: 46, spd: 41, spe: 60 },
  Whiscash: { hp: 110, atk: 78, def: 73, spa: 76, spd: 71, spe: 60 },
  Corphish: { hp: 43, atk: 80, def: 65, spa: 50, spd: 35, spe: 35 },
  Crawdaunt: { hp: 63, atk: 120, def: 85, spa: 90, spd: 55, spe: 55 },
  Baltoy: { hp: 40, atk: 40, def: 55, spa: 40, spd: 70, spe: 55 },
  Claydol: { hp: 60, atk: 70, def: 105, spa: 70, spd: 120, spe: 75 },
  Lileep: { hp: 66, atk: 41, def: 77, spa: 61, spd: 87, spe: 23 },
  Cradily: { hp: 86, atk: 81, def: 97, spa: 81, spd: 107, spe: 43 },
  Anorith: { hp: 45, atk: 95, def: 50, spa: 40, spd: 50, spe: 75 },
  Armaldo: { hp: 75, atk: 125, def: 100, spa: 70, spd: 80, spe: 45 },
  Feebas: { hp: 20, atk: 15, def: 20, spa: 10, spd: 55, spe: 80 },
  Milotic: { hp: 95, atk: 60, def: 79, spa: 100, spd: 125, spe: 81 },
  Castform: { hp: 70, atk: 70, def: 70, spa: 70, spd: 70, spe: 70 },
  Kecleon: { hp: 60, atk: 90, def: 70, spa: 60, spd: 120, spe: 40 },
  Shuppet: { hp: 44, atk: 75, def: 35, spa: 63, spd: 33, spe: 45 },
  Banette: { hp: 64, atk: 115, def: 65, spa: 83, spd: 63, spe: 65 },
  Duskull: { hp: 20, atk: 40, def: 90, spa: 30, spd: 90, spe: 25 },
  Dusclops: { hp: 40, atk: 70, def: 130, spa: 60, spd: 130, spe: 25 },
  Tropius: { hp: 99, atk: 68, def: 83, spa: 72, spd: 87, spe: 51 },
  Chimecho: { hp: 65, atk: 50, def: 70, spa: 95, spd: 80, spe: 65 },
  Absol: { hp: 65, atk: 130, def: 60, spa: 75, spd: 60, spe: 75 },
  Wynaut: { hp: 95, atk: 23, def: 48, spa: 23, spd: 48, spe: 23 },
  Snorunt: { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 },
  Glalie: { hp: 80, atk: 80, def: 80, spa: 80, spd: 80, spe: 80 },
  Spheal: { hp: 70, atk: 40, def: 50, spa: 55, spd: 50, spe: 25 },
  Sealeo: { hp: 90, atk: 60, def: 70, spa: 75, spd: 70, spe: 45 },
  Walrein: { hp: 110, atk: 80, def: 90, spa: 95, spd: 90, spe: 65 },
  Clamperl: { hp: 35, atk: 64, def: 85, spa: 74, spd: 55, spe: 32 },
  Huntail: { hp: 55, atk: 104, def: 105, spa: 94, spd: 75, spe: 52 },
  Gorebyss: { hp: 55, atk: 84, def: 105, spa: 114, spd: 75, spe: 52 },
  Relicanth: { hp: 100, atk: 90, def: 130, spa: 45, spd: 65, spe: 55 },
  Luvdisc: { hp: 43, atk: 30, def: 55, spa: 40, spd: 65, spe: 97 },
  Bagon: { hp: 45, atk: 75, def: 60, spa: 40, spd: 30, spe: 50 },
  Shelgon: { hp: 65, atk: 95, def: 100, spa: 60, spd: 50, spe: 50 },
  Salamence: { hp: 95, atk: 135, def: 80, spa: 110, spd: 80, spe: 100 },
  Beldum: { hp: 40, atk: 55, def: 80, spa: 35, spd: 60, spe: 30 },
  Metang: { hp: 60, atk: 75, def: 100, spa: 55, spd: 80, spe: 50 },
  Metagross: { hp: 80, atk: 135, def: 130, spa: 95, spd: 90, spe: 70 },
  Regirock: { hp: 80, atk: 100, def: 200, spa: 50, spd: 100, spe: 50 },
  Regice: { hp: 80, atk: 50, def: 100, spa: 100, spd: 200, spe: 50 },
  Registeel: { hp: 80, atk: 75, def: 150, spa: 75, spd: 150, spe: 50 },
  Latias: { hp: 80, atk: 80, def: 90, spa: 110, spd: 130, spe: 110 },
  Latios: { hp: 80, atk: 90, def: 80, spa: 130, spd: 110, spe: 110 },
  Kyogre: { hp: 100, atk: 100, def: 90, spa: 150, spd: 140, spe: 90 },
  Groudon: { hp: 100, atk: 150, def: 140, spa: 100, spd: 90, spe: 90 },
  Rayquaza: { hp: 105, atk: 150, def: 90, spa: 150, spd: 90, spe: 95 },
  Jirachi: { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 },
  Turtwig: { hp: 55, atk: 68, def: 64, spa: 45, spd: 55, spe: 31 },
  Chimchar: { hp: 44, atk: 58, def: 44, spa: 58, spd: 44, spe: 61 },
  Piplup: { hp: 53, atk: 51, def: 53, spa: 61, spd: 56, spe: 40 },
} as const satisfies Partial<Record<Species, StatsValue>>;

type StatSpecies = keyof typeof baseStats;

/**
 * Returns the base stats for a given species.
 * Good for tools that only accept a small set of species, like starters.
 */
export const getStrictBaseStats = (species: StatSpecies): StatsValue => {
  return baseStats[species];
};

/**
 * Accepts any valid species, but returns null if the base stats are not defined.
 * Good for cases where a tool accepts a large variety of species.
 * Just make sure to add the stats for new tools, like eggs.
 */
export const getLooseBaseStats = (species: Species): StatsValue | null => {
  return get(baseStats, species) ?? null;
};
