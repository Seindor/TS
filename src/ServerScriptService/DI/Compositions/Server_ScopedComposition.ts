import type { Container } from "ReplicatedStorage/DI/Container";
import { ServerRegistry } from "../ServerRegistry";

import { ProfileComponent } from "ServerScriptService/Components/Player/ProfileComponent";
import { PlayerComponent } from "ServerScriptService/Components/Player/PlayerComponent";

import { CreateProfileTemplate } from "ServerStorage/ServerTemplates/ProfileTemplate";
import { CreateSlottemplate } from "ServerStorage/ServerTemplates/SlotTemplate";

export function Server_ScopedComposition(container: Container) {
	//Player
	container.bindScoped(ServerRegistry.Scoped.Components.PlayerComponent, (scope) => scope.create(PlayerComponent));
	container.bindScoped(ServerRegistry.Scoped.Components.ProfileComponent, (scope) => scope.create(ProfileComponent));
	container.bindScoped(ServerRegistry.Scoped.Templates.SlotTemplate, () => () => CreateSlottemplate());
	container.bindScoped(ServerRegistry.Scoped.Templates.ProfileTemplate, () => () => CreateProfileTemplate());
}
