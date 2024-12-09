import { EnemyNPC, PlayableCharacter } from "./characters";
import { Effect, Terrain } from "./stuffs";

export interface IParty {
    members: PlayableCharacter[];
    addMember(member: PlayableCharacter): void;
    removeMember(member: PlayableCharacter): void;
}

export interface IWave {
    enemies: EnemyNPC[];
}

export interface IEngagement {
    pc: PlayableCharacter;
    npcs: EnemyNPC[];  // 1 to 3 NPCs
    effects: Effect[];
}

export interface IEncounter {
    party: Party;
    wave: Wave;
    terrain: Terrain;
    start(): void;
}



// Party, Wave, Terrain, Engagement and Encounter classes
export class Party implements IParty {
    members: PlayableCharacter[];

    constructor(members: PlayableCharacter[]) {
      if (members.length < 1 || members.length > 6) {
        throw new Error("A party must have between 1 and 6 members.");
      }
      this.members = members;
    }

    addMember(member: PlayableCharacter): void {
        if (this.members.length < 6) {
            this.members.push(member);
        } else {
            throw new Error("Party is full. Cannot add more members.");
        }
    }
    

    removeMember(member: PlayableCharacter): void {
        this.members = this.members.filter((m) => m !== member);
    }

}


export class Wave implements IWave {
    enemies: EnemyNPC[];


    constructor(enemies: EnemyNPC[]) {
        if (enemies.length < 1 || enemies.length > 20) {
          throw new Error("A wave must have between 1 and 20 enemies.");
        }
        this.enemies = enemies;
      }
}



export class Engagement implements IEngagement {
    pc: PlayableCharacter;
    npcs: EnemyNPC[];
    effects: Effect[];

    constructor(pc: PlayableCharacter, npcs: EnemyNPC[], effects: Effect[] = []) {
        if (npcs.length < 1 || npcs.length > 3) {
            throw new Error("An engagement slot must have between 1 and 3 NPCs.");
        }
        this.pc = pc;
        this.npcs = npcs;
        this.effects = effects;
    }
}

export class Encounter implements IEncounter {
    party: Party;
    wave: Wave;
    terrain: Terrain;

    constructor(party: Party, wave: Wave, terrain: Terrain) {
        this.party = party;
        this.wave = wave;
        this.terrain = terrain;
    }

    start() {
        // Implement encounter logic here. This is a placeholder.
        console.log("Encounter started!");

        // Assign PCs and NPCs to engagement slots.  This is a simplified example.
        //  A real implementation would likely have more complex matching logic.
        this.terrain.engagementSlots.forEach((slot, index) => {
          if (this.party.members[index]) {
            slot.pc = this.party.members[index];
          }
          // Distribute enemies among slots
          const npcsForThisSlot = this.wave.enemies.splice(0, 3); // Take up to 3 enemies
          slot.npcs = npcsForThisSlot;
        });


        console.log("Encounter in progress...");
        // ... more encounter logic (combat, effects, etc.)
        console.log("Encounter ended.");
    }
}