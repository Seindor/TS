import { createToken } from "ReplicatedStorage/DI/Token";

import { IAbilitySystemMethods } from "ReplicatedStorage/SharedInterfaces/ISystems/IAbilitySystem";

import { EventBusStatic } from "ReplicatedStorage/Modules/Utilities/EventBus";
import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";
import { TaskManagerStatic } from "ReplicatedStorage/Modules/Utilities/TaskManager";

export const SharedSingletonRegistries = {
	Systems: {
		AbilitySystem: createToken<IAbilitySystemMethods>("AbilitySysem"),
	},

	Utilities: {
		EventBus: createToken<EventBusStatic>("EventBus"),
		TaskManager: createToken<TaskManagerStatic>("TaskManager"),
		TableHelper: createToken<typeof TableHelper>("TableHelper"),
	},
} as const;
