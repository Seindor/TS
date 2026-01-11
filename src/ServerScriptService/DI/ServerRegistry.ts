import { ServerScopedRegistries } from "./Registries/Server/ServerScopedRegistries";
import { ServerSingletonRegistries } from "./Registries/Server/ServerSingletonRegistries";
import { ServerTransientRegistries } from "./Registries/Server/ServerTransientRegistries";

export const ServerRegistry = {
	Scoped: ServerScopedRegistries,
	Singleton: ServerSingletonRegistries,
	Transient: ServerTransientRegistries,
} as const;
