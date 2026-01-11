import type { Container } from "ReplicatedStorage/DI/Container";
import { ServerRegistry } from "../ServerRegistry";
import { CreateSessionTemplate } from "ServerStorage/Templates/SessionTemplate";

export function Server_SingletonComposition(container: Container) {
	container.bindTransient(ServerRegistry.Transient.SessionTemplate, () => CreateSessionTemplate);
}
