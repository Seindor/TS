import { Shared_ScopedRegistries } from "./Registries/Shared/Shared_ScopedRegistries";
import { SharedSingletonRegistries } from "./Registries/Shared/Shared_SingletonsRegistries";
import { Shared_TransientRegistries } from "./Registries/Shared/Shared_TransientRegistries";

export const SharedRegistry = {
	Singleton: SharedSingletonRegistries,
	Scoped: Shared_ScopedRegistries,
	Transient: Shared_TransientRegistries,
} as const;
