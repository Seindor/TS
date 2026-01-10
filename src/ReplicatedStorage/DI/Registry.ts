import { SingletonRegistries } from "./Registries/SingletonRegistries";
import { ScopedRegistries } from "./Registries/ScopedRegistries";
import { TransientRegistries } from "./Registries/TransientRegistries";

export const Registry = {
	Singleton: SingletonRegistries,
	Scoped: ScopedRegistries,
	Transient: TransientRegistries,
} as const;
