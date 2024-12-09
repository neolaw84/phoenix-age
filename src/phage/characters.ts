import { Effect, Equipment, Item } from "./stuffs";

// Interfaces
export interface ICharacter {
    name: string;
    health: number;
    effects: Effect[];
    addItem(item: Item): void;
    removeItem(item: Item): void;
}

export interface IPlayableCharacter extends ICharacter {
    level: number;
    experience: number;
    equipItem(item: Equipment): void;
    unequipItem(item: Equipment): void;
}


export interface INonPlayableCharacter extends ICharacter {
    aiType: string; //e.g., "aggressive", "passive", "defensive"
}

export interface IEnemyNPC extends INonPlayableCharacter {
    dropTable: Item[]; // Items that can be dropped upon defeat.
}




// Character classes
export abstract class Character implements ICharacter {
    name: string;
    health: number;
    effects: Effect[];
    inventory: Item[] = []; // Add inventory

    constructor(name: string, health: number, effects: Effect[] = []) {
        this.name = name;
        this.health = health;
        this.effects = effects;
    }

    addItem(item: Item): void {
        this.inventory.push(item);
    }
    
    removeItem(item: Item): void {
        this.inventory = this.inventory.filter((i) => i !== item);
    }
}




export class PlayableCharacter extends Character implements IPlayableCharacter {
    level: number;
    experience: number;
    equippedItems: { [slot: string]: Equipment | null } = {}; // Track equipped items by slot


    constructor(name: string, health: number, level: number, experience: number, effects: Effect[] = []) {
        super(name, health, effects);
        this.level = level;
        this.experience = experience;
    }

    equipItem(item: Equipment): void {
        if (item.equippableBy.includes("PC")) { // Check if the PC can equip this item
            this.equippedItems[item.slot] = item;
            console.log(`${this.name} equipped ${item.name} in slot ${item.slot}`);
        } else {
            console.log(`${this.name} cannot equip ${item.name}.`);
        }
    }

    unequipItem(item: Equipment): void {
        if (this.equippedItems[item.slot] === item) {
            this.equippedItems[item.slot] = null;
            console.log(`${this.name} unequipped ${item.name} from slot ${item.slot}`);
        }
    }
}




export class NonPlayableCharacter extends Character implements INonPlayableCharacter {
    aiType: string;

    constructor(name: string, health: number, aiType: string, effects: Effect[] = []) {
        super(name, health, effects);
        this.aiType = aiType;
    }
}

export class EnemyNPC extends NonPlayableCharacter implements IEnemyNPC {
    dropTable: Item[];

    constructor(name: string, health: number, aiType: string, dropTable: Item[], effects: Effect[] = []) {
        super(name, health, aiType, effects);
        this.dropTable = dropTable;
    }
}