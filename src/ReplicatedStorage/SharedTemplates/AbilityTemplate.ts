import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";
import { IClientPlayerComponent } from "ReplicatedStorage/SharedInterfaces/IComponents/IClientPlayerComponent";
import { IAbilityBlacklist, IAbilityTags } from "ReplicatedStorage/SharedInterfaces/ISystems/IAbilitySystem";
import { SessionTemplate } from "./SessionTemplate";

type AnyFunc = (...args: never[]) => unknown;

type AbilityFunctions = {
	OnStart: AnyFunc;
	OnCommit: AnyFunc;
	OnEnd: AnyFunc;
} & { [key: string]: AnyFunc };

const Ability = {
	RunTime: {
		Owner: undefined as { Session: SessionTemplate } | undefined,

		Cooldown: 0,
		LastUsed: 0,
		Active: false,

		Additional: {} as { [key: string]: unknown },
	},

	Config: {
		Name: "AbiilityName",
		MinDuration: 1,
		Duration: 1,

		Key: Enum.UserInputType.MouseButton1 as Enum.UserInputType | Enum.KeyCode,
		Whitelist: [] as IAbilityBlacklist,
		Tags: [] as IAbilityTags,
	},

	Functions: {
		OnStart: () => {
			print("OnStart");
		},

		OnCommit: () => {
			print("OnCommit");
		},

		OnEnd: () => {
			print("OnEnd");
		},
	} as AbilityFunctions,
};

export type AbilityTemplate = typeof Ability;

export function CreateAbilityTemplate(): AbilityTemplate {
	const Clonned = TableHelper.deepClone(Ability);

	Clonned.Functions = {
		OnStart: Ability.Functions.OnStart,
		OnCommit: Ability.Functions.OnCommit,
		OnEnd: Ability.Functions.OnEnd,
	};

	return Clonned;
}
