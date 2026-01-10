import { Profile } from "@rbxts/profile-store";
import { IProfile } from "./IProfile";
import { IReplica } from "./IReplica";

export interface IProfileComponent {
	LoadProfile(Player: Player): Profile<IProfile>;
	CreateSlot(Player: Player): void;
	SelectSlot(Player: Player, SlotNumber: number): void;
	LoadReplica(Player: Player): {
		profile: Profile<IProfile>;
		replica: IReplica;
	};
}
