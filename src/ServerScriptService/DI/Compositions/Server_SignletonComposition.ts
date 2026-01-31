import type { Container } from "ReplicatedStorage/DI/Container";
import { ServerRegistry } from "../ServerRegistry";
import { PlayersService } from "ServerScriptService/Services/PlayersService";

export function Server_SingletonComposition(container: Container) {
	container.bindSingleton(ServerRegistry.Singleton.Services.PlayersService, (scope) => {
		return scope.create(PlayersService);
	});
}
