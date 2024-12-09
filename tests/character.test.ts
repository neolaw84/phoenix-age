import { Character, PlayableCharacter } from "../src/phage/characters";


describe("PlayableCharacter", () => {
    it("should create a playable character with correct properties", () => {
        const pc = new PlayableCharacter("Hero", 100, 1, 0);
        expect(pc.name).toBe("Hero");
        expect(pc.health).toBe(100);
        expect(pc.level).toBe(1);
        expect(pc.experience).toBe(0);
      });
});