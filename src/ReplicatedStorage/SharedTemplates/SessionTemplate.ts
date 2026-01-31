import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";

import { ICharacterDataComponent } from "ReplicatedStorage/SharedInterfaces/IComponents/ICharacterDataComponent";

export const StatusEffects = ["Stun", "Knocked", "Dead"] as const;
export type StatusId = (typeof StatusEffects)[number];
export type IStatusEffects = Partial<Record<StatusId, true>>;

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

	StatusEffects: {} as IStatusEffects,

	MiscStates: {
		CurrentClick: 1,
	},

	PressedKeys: {} as { [key: string]: unknown },

	Settings: {
		Loaded: false,
		ReplicaLoaded: false,
		CharacterLoaded: false,
	},
};

export type SessionTemplate = typeof SessionTemplate;

export function CreateSessionTemplate(): SessionTemplate {
	return TableHelper.deepClone(SessionTemplate);
}
