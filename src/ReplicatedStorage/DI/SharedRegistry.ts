import { SharedSingletonRegistries } from "./Registries/Shared/SharedSingletonsRegistries";

export const SharedRegistry = {
	Singleton: SharedSingletonRegistries,
} as const;
