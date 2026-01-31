import { createToken } from "ReplicatedStorage/DI/Token";
import { IClientPlayerComponentMethods } from "ReplicatedStorage/SharedInterfaces/IComponents/IClientPlayerComponent";

export const Client_SingletonRegistries = {
	Components: {
		ClientPlayerComponent: createToken<IClientPlayerComponentMethods>("ClientPlayerComponent"),
	},
} as const;
