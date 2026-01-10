import EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";

export function init() {
	const Bus = EventBus.New("Game");
	Bus.SubscribeT<[Player]>("Character.CharacterAdded", () => {
		print("CLIENT, SERVER PLAYER CHARACTER LOADED 🤯🥳😇😇🥳😇🥳😇🥳");
	});
}
