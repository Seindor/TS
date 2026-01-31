import { Players } from "@rbxts/services";
import { CompositionRootClient } from "ReplicatedStorage/DI/CompositionRoot_Client";
import { ClientRegistry } from "ReplicatedStorage/DI/ClientRegistry";

const Scope = CompositionRootClient.createScope();
const ClientPlayerComponent = Scope.resolve(ClientRegistry.Singleton.Components.ClientPlayerComponent);

const _Player = Players.LocalPlayer;

export function init() {
	const Player = ClientPlayerComponent.CreateClientPlayer(_Player);

	do {
		task.wait(0.1);
	} while (!Player.Session.Settings.ReplicaLoaded && !Player.Replica);

	Player.Replica?.OnSet(["Session", "Attributes", "Health"], (newValue: number, oldValue: number) => {
		print(newValue, oldValue);
	});
}
