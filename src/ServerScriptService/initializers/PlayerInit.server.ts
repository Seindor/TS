import { Players } from "@rbxts/services";
import { CompositionRootServer } from "ServerScriptService/DI/CompositionRootServer";
import { Registry } from "ReplicatedStorage/DI/Registry";

const scope = CompositionRootServer.createScope();
const PlayersService = scope.resolve(Registry.Singleton.PlayersService);
const ProfileComponent = scope.resolve(Registry.Scoped.ProfileComponent);

function initPlayer(_Player: Player) {
	const Player = PlayersService.Get(_Player);
	ProfileComponent.CreateSlot(_Player);
	task.wait(5);
	print(Player);
}

Players.PlayerAdded.Connect(initPlayer);
