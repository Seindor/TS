import { IPlayerComponent } from "../IComponents/IPlayerComponent";

export interface IPlayersService {
	Get(Player: Player): IPlayerComponent;
}
