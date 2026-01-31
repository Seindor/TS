import type { Container } from "ReplicatedStorage/DI/Container";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";
import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";
import TaskManager from "ReplicatedStorage/Modules/Utilities/TaskManager";
import { AbilitySystem } from "ReplicatedStorage/Systems/AbilitySystem";

export function Shared_SingletonComposition(container: Container) {
	container.bindSingleton(SharedRegistry.Singleton.Systems.AbilitySystem, (scope) => scope.create(AbilitySystem));

	container.bindSingleton(SharedRegistry.Singleton.Utilities.EventBus, () => EventBus);
	container.bindSingleton(SharedRegistry.Singleton.Utilities.TaskManager, () => TaskManager);
	container.bindSingleton(SharedRegistry.Singleton.Utilities.TableHelper, () => TableHelper);
}
