import { createToken } from "ReplicatedStorage/DI/Token";

import type EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";
import { IPlayersService } from "ReplicatedStorage/Interfaces/IServices/IPlayersService";

export const SingletonRegistries = {
	EventBus: createToken<EventBus>("EventBus"),
	PlayersService: createToken<IPlayersService>("PlayersService"),
} as const;
