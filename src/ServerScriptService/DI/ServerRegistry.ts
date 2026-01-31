import { ServerScopedRegistries } from "./Registries/Server/Server_ScopedRegistries";
import { ServerSingletonRegistries } from "./Registries/Server/Server_SingletonRegistries";
import { ServerTransientRegistries } from "./Registries/Server/Server_TransientRegistries";

export const ServerRegistry = {
	Scoped: ServerScopedRegistries,
	Singleton: ServerSingletonRegistries,
	Transient: ServerTransientRegistries,
} as const;
