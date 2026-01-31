import Replicator from "ReplicatedStorage/Modules/Network/Replicator";
import EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";

export function init() {
	const GlobalRemote = Replicator.GetRemote("Global");
	const Bus = EventBus.New("Game");
	Bus.Subscribe(
		"Signals.SendToClient",
		(...args) => {
			const Player = args[0];
			GlobalRemote?.Fire(Player, "LaunchBus", ...args);
			print("Fired");
		},
		undefined,
	);
}
