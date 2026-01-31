import { Players } from "@rbxts/services";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import { CompositionRootServer } from "ServerScriptService/DI/CompositionRoot_Server";
import { ServerRegistry } from "ServerScriptService/DI/ServerRegistry";

import { AbilityInit } from "ServerScriptService/Abilities/TestAbility";

const scope = CompositionRootServer.createScope();
const PlayersService = scope.resolve(ServerRegistry.Singleton.Services.PlayersService);
const AbilitySystem = scope.resolve(SharedRegistry.Singleton.Systems.AbilitySystem);
const EventBus = scope.resolve(SharedRegistry.Singleton.Utilities.EventBus);
const ProfileComponent = scope.resolve(ServerRegistry.Scoped.Components.ProfileComponent);

function initPlayer(_Player: Player) {
	const Player = PlayersService.Get(_Player);

	ProfileComponent.CreateSlot(_Player);

	task.wait(5);

	print(Player);
	Player.Replica.Set(["Session", "Attributes", "Health"], 70);

	const Ability = AbilityInit();
	AbilitySystem.SetOwner(Ability, Player);
	AbilitySystem.CheckBlacklist(Ability, ["Knocked"]);

	print(Ability);
}

Players.PlayerAdded.Connect(initPlayer);
