import { createToken } from "ReplicatedStorage/DI/Token";

import { IPlayersService } from "ServerStorage/ServerInterfaces/IServices/IPlayersService";

export const ServerSingletonRegistries = {
	PlayersService: createToken<IPlayersService>("PlayersService"),
} as const;
