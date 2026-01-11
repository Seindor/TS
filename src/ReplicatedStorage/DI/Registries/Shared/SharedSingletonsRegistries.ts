import { createToken } from "ReplicatedStorage/DI/Token";

import type EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";
import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";
import TaskManager from "ReplicatedStorage/Modules/Utilities/TaskManager";

export const SharedSingletonRegistries = {
	EventBus: createToken<EventBus>("EventBus"),
	TaskManager: createToken<TaskManager>("TaskManager"),
	TableHelper: createToken<TableHelper>("TableHelper"),
} as const;
