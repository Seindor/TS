import type { Container } from "ReplicatedStorage/DI/Container";
import { ServerRegistry } from "../ServerRegistry";
import { CreateSessionTemplate } from "ServerStorage/Templates/SessionTemplate";
import { CharacterDataComponent } from "ServerScriptService/Components/CharacterDataComponent";
import { SessionComponent } from "ServerScriptService/Components/SessionComponent";
import { ProfileComponent } from "ServerScriptService/Components/ProfileComponent";
import { PlayerComponent } from "ServerScriptService/Components/PlayerComponent";

export function Server_ScopedComposition(container: Container) {
	//Player
	container.bindScoped(ServerRegistry.Scoped.PlayerComponent, (scope) => scope.instantiate(PlayerComponent));
	container.bindScoped(ServerRegistry.Scoped.SessionComponent, (scope) => scope.instantiate(SessionComponent));
	container.bindScoped(ServerRegistry.Scoped.CharacterDataComponent, (scope) =>
		scope.instantiate(CharacterDataComponent),
	);
	container.bindScoped(ServerRegistry.Scoped.ProfileComponent, (scope) => scope.instantiate(ProfileComponent));
	container.bindTransient(ServerRegistry.Transient.SessionTemplate, () => CreateSessionTemplate);
}
