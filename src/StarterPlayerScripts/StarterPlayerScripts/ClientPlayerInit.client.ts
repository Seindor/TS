import { Players } from "@rbxts/services";
import { CompositionRootClient } from "ReplicatedStorage/DI/CompositionRoot_Client";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import { ClientRegistry } from "ReplicatedStorage/DI/ClientRegistry";

const _Player = Players.LocalPlayer;

const scope = CompositionRootClient.createScope();
const ClientPlayerComponent = scope.resolve(ClientRegistry.Singleton.Components.ClientPlayerComponent);
const EventBus = scope.resolve(SharedRegistry.Singleton.Utilities.EventBus);

function initPlayer(_Player: Player) {
	const Player = ClientPlayerComponent.CreateClientPlayer(_Player);

	task.wait(5);

	const GameBus = EventBus.New("Game");
	GameBus.Fire("Client.Loaded", undefined);
}

initPlayer(_Player);
