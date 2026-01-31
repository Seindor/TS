import { ServerScriptService } from "@rbxts/services";

const TSFolder = ServerScriptService.WaitForChild("TS");

const ServerSignals = TSFolder.WaitForChild("ServerSignals");

type HasInit = {
	init: () => undefined;
};

for (const inst of ServerSignals.GetDescendants()) {
	if (inst.IsA("ModuleScript")) {
		const Mod = require(inst as ModuleScript) as unknown as HasInit;
		Mod.init();
	}
}
