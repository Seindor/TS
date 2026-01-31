import { createToken } from "ReplicatedStorage/DI/Token";

import { ISessionComponent } from "ReplicatedStorage/SharedInterfaces/IComponents/ISessionComponent";
import { ICharacterDataComponentMethods } from "ReplicatedStorage/SharedInterfaces/IComponents/ICharacterDataComponent";

import type { SessionTemplate } from "ReplicatedStorage/SharedTemplates/SessionTemplate";
import { AbilityTemplate } from "ReplicatedStorage/SharedTemplates/AbilityTemplate";

export const Shared_ScopedRegistries = {
	Components: {
		SessionComponent: createToken<ISessionComponent>("SessionComponent"),
		CharacterDataComponent: createToken<ICharacterDataComponentMethods>("CharacterDataComponent"),
	},

	Templates: {
		SessionTemplate: createToken<() => SessionTemplate>("SessionTemplate"),
		AbilityTemplate: createToken<() => AbilityTemplate>("AbilityTemplate"),
	},
} as const;
