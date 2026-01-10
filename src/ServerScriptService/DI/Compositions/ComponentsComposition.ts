import type { Container } from "ReplicatedStorage/DI/Container";
import { Registry } from "ReplicatedStorage/DI/Registry";
import { CreateSessionTemplate } from "ReplicatedStorage/Templates/SessionTemplate";
import { CharacterDataComponent } from "ServerScriptService/Components/CharacterDataComponent";
import { SessionComponent } from "ServerScriptService/Components/SessionComponent";
import { ProfileComponent } from "ServerScriptService/Components/ProfileComponent";
import { PlayerComponent } from "ServerScriptService/Components/PlayerComponent";

export function ComponentsComposition(container: Container) {
	//Player
	container.bindScoped(Registry.Scoped.PlayerComponent, (scope) => scope.instantiate(PlayerComponent));
	container.bindScoped(Registry.Scoped.SessionComponent, (scope) => scope.instantiate(SessionComponent));
	container.bindScoped(Registry.Scoped.CharacterDataComponent, (scope) => scope.instantiate(CharacterDataComponent));
	container.bindScoped(Registry.Scoped.ProfileComponent, (scope) => scope.instantiate(ProfileComponent));
	container.bindTransient(Registry.Transient.SessionFactory, () => CreateSessionTemplate);
}
