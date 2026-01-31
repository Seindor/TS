import Replicator from "ReplicatedStorage/Modules/Network/Replicator";
import EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";

export function init() {
	const GameBus = EventBus.New("Game");
	const Global = Replicator.GetRemote("Global");
	Global?.Connect("LaunchBus", (...args) => {
		GameBus.Fire(args[1] as string, args[2] as number, ...args);
	});
}
