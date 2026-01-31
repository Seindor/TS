import { Players } from "@rbxts/services";
import { CompositionRootClient } from "ReplicatedStorage/DI/CompositionRoot_Client";
import { ClientRegistry } from "ReplicatedStorage/DI/ClientRegistry";
import EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";
import { IClientPlayerComponent } from "ReplicatedStorage/SharedInterfaces/IComponents/IClientPlayerComponent";
import { ReplicaClient } from "@rbxts/mad-replica";

const scope = CompositionRootClient.createScope();
const ClientPlayerComponent = scope.resolve(ClientRegistry.Singleton.Components.ClientPlayerComponent);

const _Player = Players.LocalPlayer;

export function init() {
	const Bus = EventBus.New("Game");

	Bus.Subscribe("Client.Loaded", () => {
		const Player = ClientPlayerComponent.CreateClientPlayer(_Player);
		ReplicaClient.RequestData();
		print("Client Loaded, Player:", Player);
	});
}
