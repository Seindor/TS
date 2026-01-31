import { Client_ScopedRegistries } from "./Registries/Client/Client_ScopedRegistries";
import { Client_SingletonRegistries } from "./Registries/Client/Client_SingletonRegistries";
import { Client_TransientRegistries } from "./Registries/Client/Client_TransientRegistries";

export const ClientRegistry = {
	Scoped: Client_ScopedRegistries,
	Singleton: Client_SingletonRegistries,
	Transient: Client_TransientRegistries,
} as const;
