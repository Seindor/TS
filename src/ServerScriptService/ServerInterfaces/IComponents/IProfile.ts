import { ItemMeta } from "ReplicatedStorage/Types/ItemMeta";

export type InventoryData = {
	Stacks: Record<string, ItemStack>;
	Index: Record<string, string>;
	MaxStacks: number;
};

export type ItemStack = {
	StackId: string;
	BaseId: string;
	Count: number;
	Meta: ItemMeta;
};

export type SavedColor = {
	R: number;
	G: number;
	B: number;
};

export type SlotData = {
	CreatedAt: number;
	LastPlayedAt: number;

	Appearance: {
		Name: string;
		SecondName: string;

		Eyebrows: number;
		Eyes: number;
		Nose: number;
		Mouth: number;

		EyesColor: SavedColor;
		HairColor: SavedColor;

		PrimaryColor: SavedColor;
		SecondaryColor: SavedColor;
	};

	Equipment: {
		Weapon: string;
		Hat: string;
		Face: string;
		Earrings: string;
		Arms: string;
		Back: string;
		Belt: string;
		Pants: string;
		Boots: string;
	};

	Progression: {
		Rank: number;
		Experience: number;
		Star: number;
	};

	Attributes: {
		Race: "Ghoul" | "Human";
		Gender: "Male" | "Female";
		SubRace: "none" | "HalfHuman" | "OneEyed";
		Fraction: "CCG" | "Aogiri" | "none";
	};

	Stats: {
		Reputation: number;
		RC: number;
		Yens: number;

		PlayerKills: number;
		Deaths: number;
		Wipes: number;
		MissionsCompleted: number;
	};

	OpenStats: {
		Strength: number;
		Health: number;
		Speed: number;

		Resistance: number;
		Technique: number;
		Sanity: number;
	};

	LockedStats: {
		HeavyWeapon: number;
		MediumWeapon: number;
		LightWeapon: number;
		RangedWeapon: number;
	};

	DataStates: {
		Wiped: boolean;
	};

	Moddifiers: string[];

	Quests: string[];

	Inventory: InventoryData;
};

export type PlayerSettings = {
	HoldClick: boolean;
	AutoRun: boolean;

	MusicVolume: number;
	SfxVolume: number;

	ShowDamage: boolean;
};

export type IProfile = {
	Account: {
		ActiveSlotId: number;
		SlotCount: number;
		PurchasedSlotCount: number;

		Settings: PlayerSettings;

		Achievements: string[];
	};

	Slots: Record<number, SlotData>;
};
