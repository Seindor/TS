import { ServerRegistry } from "ServerScriptService/DI/ServerRegistry";
import {
	IPlayerComponent,
	IPlayerComponentMethods,
} from "ServerScriptService/ServerInterfaces/IComponents/IPlayerComponent";

export class PlayersService {
	public static Inject = [ServerRegistry.Scoped.PlayerComponent];

	public Modules!: {
		playerComponent: IPlayerComponentMethods;
	};

	public Players = new Map<string, IPlayerComponent>();

	constructor(playerComponent: IPlayerComponentMethods) {
		this.Modules = {
			playerComponent: playerComponent,
		};
	}

	public Get(player: Player): IPlayerComponent {
		if (!this.Players.has(tostring(player.UserId))) {
			const Player = this.Modules.playerComponent.CreatePlayer(player);
			this.Players.set(Player.Id, Player);
		}
		return this.Players.get(tostring(player.UserId))!;
	}
}
