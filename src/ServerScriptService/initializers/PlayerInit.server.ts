import { Players } from "@rbxts/services";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import { CompositionRootServer } from "ServerScriptService/DI/CompositionRootServer";
import { ServerRegistry } from "ServerScriptService/DI/ServerRegistry";

const scope = CompositionRootServer.createScope();
const PlayersService = scope.resolve(ServerRegistry.Singleton.PlayersService);
const EventBus = scope.resolve(SharedRegistry.Singleton.EventBus);
const ProfileComponent = scope.resolve(ServerRegistry.Scoped.ProfileComponent);

function initPlayer(_Player: Player) {
	const Player = PlayersService.Get(_Player);

	ProfileComponent.CreateSlot(_Player);

	task.wait(5);

	print(Player);
}

Players.PlayerAdded.Connect(initPlayer);
