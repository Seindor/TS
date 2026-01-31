import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";
import { SlotData } from "ReplicatedStorage/SharedInterfaces/IComponents/IProfile";

const SlotTemplate = {
	CreatedAt: os.clock(),
	LastPlayedAt: os.clock(),

	Appearance: {
		Name: "",
		SecondName: "",

		Eyebrows: 1,
		Eyes: 1,
		Nose: 1,
		Mouth: 1,

		EyesColor: {
			R: 255,
			G: 255,
			B: 255,
		},

		HairColor: {
			R: 255,
			G: 255,
			B: 255,
		},

		PrimaryColor: {
			R: 255,
			G: 255,
			B: 255,
		},

		SecondaryColor: {
			R: 255,
			G: 255,
			B: 255,
		},
	},

	Equipment: {
		Weapon: "",
		Hat: "",
		Face: "",
		Earrings: "",
		Arms: "",
		Back: "",
		Belt: "",
		Pants: "",
		Boots: "",
	},

	Progression: {
		Rank: 1,
		Star: 0,
		Experience: 0,
	},

	Attributes: {
		Race: "Human",
		Gender: "Male",
		SubRace: "none",
		Fraction: "none",
	},

	Stats: {
		Reputation: 0,
		RC: 200,
		Yens: 1000,

		PlayerKills: 0,
		Deaths: 0,
		Wipes: 0,
		MissionsCompleted: 0,
	},

	OpenStats: {
		Strength: 0,
		Health: 0,
		Speed: 0,

		Resistance: 0,
		Technique: 0,
		Sanity: 0,
	},

	LockedStats: {
		HeavyWeapon: 0,
		MediumWeapon: 0,
		LightWeapon: 0,
		RangedWeapon: 0,
	},

	DataStates: {
		Wiped: false,
	},

	Moddifiers: {},

	Quests: {},
	Inventory: {},
} as SlotData;

export type SlotTemplate = typeof SlotTemplate;

export function CreateSlottemplate(): SlotTemplate {
	return TableHelper.deepClone(SlotTemplate);
}
