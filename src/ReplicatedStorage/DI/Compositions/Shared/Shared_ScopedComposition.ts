import type { Container } from "ReplicatedStorage/DI/Container";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";

import { SessionComponent } from "ReplicatedStorage/Components/SessionComponent";
import { CharacterDataComponent } from "ReplicatedStorage/Components/CharacterDataComponent";

import { CreateSessionTemplate } from "ReplicatedStorage/SharedTemplates/SessionTemplate";
import { CreateAbilityTemplate } from "ReplicatedStorage/SharedTemplates/AbilityTemplate";

export function Shared_ScopedComposition(container: Container) {
	container.bindScoped(SharedRegistry.Scoped.Components.SessionComponent, (scope) => scope.create(SessionComponent));
	container.bindScoped(SharedRegistry.Scoped.Components.CharacterDataComponent, (scope) =>
		scope.create(CharacterDataComponent),
	);

	container.bindScoped(SharedRegistry.Scoped.Templates.SessionTemplate, () => () => CreateSessionTemplate());
	container.bindScoped(SharedRegistry.Scoped.Templates.AbilityTemplate, () => () => CreateAbilityTemplate());
}
