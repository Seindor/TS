import { createToken } from "ReplicatedStorage/DI/Token";

import type { ISessionComponent } from "ServerStorage/ServerInterfaces/IComponents/ISessionComponent";
import type { ICharacterDataComponentData } from "ServerStorage/ServerInterfaces/IComponents/ICharacterDataComponent";
import type { IPlayerComponentMethods } from "ServerStorage/ServerInterfaces/IComponents/IPlayerComponent";
import type { IProfileComponent } from "ServerStorage/ServerInterfaces/IComponents/IProfileComponent";

export const ServerScopedRegistries = {
	PlayerComponent: createToken<IPlayerComponentMethods>("PlayerComponent"),
	SessionComponent: createToken<ISessionComponent>("SessionComponent"),
	CharacterDataComponent: createToken<ICharacterDataComponentData>("CharacterDataComponent"),
	ProfileComponent: createToken<IProfileComponent>("ProfileComponent"),
} as const;
