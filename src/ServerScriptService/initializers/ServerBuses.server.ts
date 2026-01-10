import { ServerScriptService } from "@rbxts/services";

const TSFolder = ServerScriptService.WaitForChild("TS");

const ServerBuses = TSFolder.WaitForChild("ServerBuses");

type HasInit = {
	init: () => undefined;
};

for (const inst of ServerBuses.GetDescendants()) {
	if (inst.IsA("ModuleScript")) {
		const Mod = require(inst as ModuleScript) as unknown as HasInit;
		Mod.init();
	}
}
