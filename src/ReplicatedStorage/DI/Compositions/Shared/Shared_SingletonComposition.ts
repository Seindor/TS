import type { Container } from "ReplicatedStorage/DI/Container";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";
import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";
import TaskManager from "ReplicatedStorage/Modules/Utilities/TaskManager";

export function Shared_SingletonComposition(container: Container) {
	container.bindSingleton(SharedRegistry.Singleton.EventBus, () => EventBus.New("Game"));
	container.bindSingleton(SharedRegistry.Singleton.TaskManager, () => TaskManager);
	container.bindSingleton(SharedRegistry.Singleton.TableHelper, () => TableHelper);
}
