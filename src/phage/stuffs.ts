import { Engagement } from "./battle";
import { Character } from "./characters";

export interface IEffect {
    name: string;
    duration: number; // Turns or time units
    apply(character: Character): void; // Method to apply the effect
}

export interface IBuff extends IEffect {
    potency: number;
}

export interface INerf extends IEffect {
    severity: number;
}

export interface ITerrain {
    name: string;
    engagementSlots: Engagement[];
}


export interface IItem {
    name: string;
    effects: Effect[];
}

export interface IClothing extends IItem {
    armorBonus: number;
}

export interface IConsumable extends IItem {
    consume(): void; 
}


export interface IEquipment extends IItem {
    slot: string; // e.g., "weapon", "armor", "accessory"
    equippableBy: string[]; //Character types who can use this. Example: ["PC"] or ["PC", "NPC"]
}


// Effect Classes
export abstract class Effect implements IEffect {
    name: string;
    duration: number;

    constructor(name: string, duration: number) {
        this.name = name;
        this.duration = duration;
    }

    abstract apply(character: Character): void;
}

export class Buff extends Effect implements IBuff {
    potency: number;

    constructor(name: string, duration: number, potency: number) {
        super(name, duration);
        this.potency = potency;
    }

    apply(character: Character): void {
        // Apply buff logic, e.g., increase stats
        console.log(`Applying buff ${this.name} to ${character.name}`);
    }
}


export class Nerf extends Effect implements INerf {
    severity: number;


    constructor(name: string, duration: number, severity: number) {
        super(name, duration);
        this.severity = severity;
    }

    apply(character: Character): void {
        // Apply nerf logic, e.g., decrease stats
        console.log(`Applying nerf ${this.name} to ${character.name}`);
    }
}


// Item classes
export abstract class Item implements IItem{
    name: string;
    effects: Effect[];

    constructor(name: string, effects: Effect[] = []) {
        this.name = name;
        this.effects = effects;
    }
}

export class Clothing extends Item implements IClothing {
    armorBonus: number;
    constructor(name: string, effects: Effect[] = [], armorBonus: number) {
      super(name, effects);
      this.armorBonus = armorBonus;
    }
}

export class Consumable extends Item implements IConsumable {

    constructor(name: string, effects: Effect[] = []) {
      super(name, effects);
    }
    consume(): void {
      console.log(`${this.name} consumed.`);
      // Apply consumable effects
    }
  }

export class Equipment extends Item implements IEquipment {
    slot: string;
    equippableBy: string[];
    constructor(name: string, effects: Effect[] = [], slot: string, equippableBy: string[]) {
      super(name, effects);
      this.slot = slot;
      this.equippableBy = equippableBy;
    }
}



export class Terrain implements ITerrain {
    name: string;
    engagementSlots: Engagement[];

    constructor(name: string, engagementSlots: Engagement[]) {
        if (engagementSlots.length < 1) {
            throw new Error("Terrain must have at least one engagement slot.");
        }
        this.name = name;
        this.engagementSlots = engagementSlots;
    }
}