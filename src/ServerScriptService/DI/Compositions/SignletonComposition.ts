import type { Container } from "ReplicatedStorage/DI/Container";
import { Registry } from "ReplicatedStorage/DI/Registry";
import EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";
import { PlayersService } from "ServerScriptService/Services/PlayersService";

export function SingletonComposition(container: Container) {
	container.bindSingleton(Registry.Singleton.EventBus, () => EventBus.New("Game"));
	container.bindSingleton(Registry.Singleton.PlayersService, (scope) => {
		return scope.instantiate(PlayersService);
	});
}
