import { createToken } from "ReplicatedStorage/DI/Token";

import type { ISessionComponent } from "ServerScriptService/ServerInterfaces/IComponents/ISessionComponent";
import type { ICharacterDataComponentData } from "ServerScriptService/ServerInterfaces/IComponents/ICharacterDataComponent";
import type { IPlayerComponentMethods } from "ServerScriptService/ServerInterfaces/IComponents/IPlayerComponent";
import type { IProfileComponent } from "ServerScriptService/ServerInterfaces/IComponents/IProfileComponent";

export const ServerScopedRegistries = {
	PlayerComponent: createToken<IPlayerComponentMethods>("PlayerComponent"),
	SessionComponent: createToken<ISessionComponent>("SessionComponent"),
	CharacterDataComponent: createToken<ICharacterDataComponentData>("CharacterDataComponent"),
	ProfileComponent: createToken<IProfileComponent>("ProfileComponent"),
} as const;
