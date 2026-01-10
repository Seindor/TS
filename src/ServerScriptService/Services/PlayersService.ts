import { Registry } from "ReplicatedStorage/DI/Registry";
import { IPlayerComponent, IPlayerComponentMethods } from "ReplicatedStorage/Interfaces/IComponents/IPlayerComponent";

export class PlayersService {
	public static Inject = [Registry.Scoped.PlayerComponent];

	private readonly playerComponent!: IPlayerComponentMethods;
	public Players = new Map<string, IPlayerComponent>();

	constructor(playerComponent: IPlayerComponentMethods) {
		this.playerComponent = playerComponent;
	}

	public Get(player: Player): IPlayerComponent {
		if (!this.Players.has(tostring(player.UserId))) {
			const Player = this.playerComponent.CreatePlayer(player);
			this.Players.set(Player.Id, Player);
		}
		return this.Players.get(tostring(player.UserId))!;
	}
}
