import { createToken } from "ReplicatedStorage/DI/Token";

import type { ISessionComponent } from "ReplicatedStorage/Interfaces/IComponents/ISessionComponent";
import type { ICharacterDataComponentData } from "ReplicatedStorage/Interfaces/IComponents/ICharacterDataComponent";
import type { IPlayerComponentMethods } from "ReplicatedStorage/Interfaces/IComponents/IPlayerComponent";
import type { IProfileComponent } from "ReplicatedStorage/Interfaces/IComponents/IProfileComponent";

export const ScopedRegistries = {
	PlayerComponent: createToken<IPlayerComponentMethods>("PlayerComponent"),
	SessionComponent: createToken<ISessionComponent>("SessionComponent"),
	CharacterDataComponent: createToken<ICharacterDataComponentData>("CharacterDataComponent"),
	ProfileComponent: createToken<IProfileComponent>("ProfileComponent"),
} as const;
