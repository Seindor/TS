import { ReplicatedStorage } from "@rbxts/services";

const TSFolder = ReplicatedStorage.WaitForChild("TS");

const ClientSignals = TSFolder.WaitForChild("ClientSignals");

type HasInit = {
	init: () => undefined;
};

for (const inst of ClientSignals.GetDescendants()) {
	if (inst.IsA("ModuleScript")) {
		const Mod = require(inst as ModuleScript) as unknown as HasInit;
		Mod.init();
	}
}
