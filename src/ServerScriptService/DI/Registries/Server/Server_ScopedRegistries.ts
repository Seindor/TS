import { createToken } from "ReplicatedStorage/DI/Token";

import type { IPlayerComponentMethods } from "ServerStorage/ServerInterfaces/IComponents/IPlayerComponent";
import type { IProfileComponent } from "ServerStorage/ServerInterfaces/IComponents/IProfileComponent";
import { ProfileTemplate } from "ServerStorage/ServerTemplates/ProfileTemplate";
import { SlotTemplate } from "ServerStorage/ServerTemplates/SlotTemplate";

export const ServerScopedRegistries = {
	Components: {
		PlayerComponent: createToken<IPlayerComponentMethods>("PlayerComponent"),
		ProfileComponent: createToken<IProfileComponent>("ProfileComponent"),
	},
	Templates: {
		SlotTemplate: createToken<() => SlotTemplate>("SlotTemplate"),
		ProfileTemplate: createToken<() => ProfileTemplate>("ProfileTemplate"),
	},
} as const;
