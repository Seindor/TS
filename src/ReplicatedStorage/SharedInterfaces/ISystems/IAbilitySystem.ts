import { AbilityTemplate } from "ReplicatedStorage/SharedTemplates/AbilityTemplate";
import { StatusId } from "ReplicatedStorage/SharedTemplates/SessionTemplate";

export const AbilityBlacklist = ["Stun", "Knocked", "Dead"] as StatusId[];
export type IAbilityBlacklist = ReadonlyArray<(typeof AbilityBlacklist)[number]>;

export const AbilityTags = ["Blockbreak", "Unparryable", "Undodgeable"] as const;
export type IAbilityTags = ReadonlyArray<(typeof AbilityTags)[number]>;

export interface IAbilitySystemMethods {
	CreateAbility(): AbilityTemplate;
	ChangeKey(Ability: AbilityTemplate, Key: Enum.KeyCode | Enum.UserInputType): Enum.KeyCode | Enum.UserInputType;
	SetOwner(Ability: AbilityTemplate, Owner: unknown): unknown;
	CheckBlacklist(Ability: AbilityTemplate, Blacklist: IAbilityBlacklist): boolean;
}
