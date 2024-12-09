import { Encounter, Engagement, Party, Wave } from "./phage/battle";
import { EnemyNPC, PlayableCharacter } from "./phage/characters";
import { Buff, Clothing, Consumable, Equipment, Terrain } from "./phage/stuffs";

// Example usage (simplified)
const sword = new Equipment("Mighty Sword", [new Buff("Strength Boost", 5, 10)], "weapon", ["PC"]);
const hero = new PlayableCharacter("Aragorn", 100, 10, 1000);
hero.addItem(sword); // Add sword to inventory
hero.equipItem(sword);


const potion = new Consumable("Healing Potion", [new Buff("Heal", 1, 50)]);
hero.addItem(potion);
potion.consume();


const orc = new EnemyNPC("Orc", 50, "aggressive", [new Clothing("Orcish Tunic", [], 2)]);

const party = new Party([hero]);
const wave = new Wave([orc]);
const terrain = new Terrain("Forest", [new Engagement(hero, [])]); // Initial empty engagement

const encounter = new Encounter(party, wave, terrain);
encounter.start();