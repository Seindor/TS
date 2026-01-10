import { ReplicatedStorage } from "@rbxts/services";

const TSFolder = ReplicatedStorage.WaitForChild("TS");

const ClientBuses = TSFolder.WaitForChild("ClientBuses");

type HasInit = {
	init: () => undefined;
};

for (const inst of ClientBuses.GetDescendants()) {
	if (inst.IsA("ModuleScript")) {
		const Mod = require(inst as ModuleScript) as unknown as HasInit;
		Mod.init();
	}
}
