import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";

import { ICharacterDataComponent } from "ReplicatedStorage/Interfaces/IComponents/ICharacterDataComponent";

const SessionTemplate = {
	Attributes: {
		MaxHealth: 100,
		Health: 100,
		WalkSpeed: 12,
		JumpPower: 50,
	},
	CharacterData: {
		Character: undefined as Model | undefined,
		Humanoid: undefined as Humanoid | undefined,
		HumanoidRootPart: undefined as BasePart | undefined,
	} as ICharacterDataComponent,

	States: {},
	PressedKeys: {},
	Settings: {
		Loaded: false,
		CharacterLoaded: false,
	},
};

export type SessionTemplate = typeof SessionTemplate;

export function CreateSessionTemplate(): SessionTemplate {
	return TableHelper.deepClone(SessionTemplate);
}
