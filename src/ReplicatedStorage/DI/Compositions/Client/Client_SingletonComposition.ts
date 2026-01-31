import { ClientPlayerComponent } from "ReplicatedStorage/Components/ClientPlayerComponent";
import { ClientRegistry } from "ReplicatedStorage/DI/ClientRegistry";
import type { Container } from "ReplicatedStorage/DI/Container";

export function Client_SingletonComposition(container: Container) {
	container.bindSingleton(ClientRegistry.Singleton.Components.ClientPlayerComponent, (scope) =>
		scope.create(ClientPlayerComponent),
	);
}
