import { Profile } from "@rbxts/profile-store";
import { IProfile } from "./IProfile";
import { Replica } from "@rbxts/mad-replica";

export interface IProfileComponent {
	LoadProfile(Player: Player): Profile<IProfile>;
	CreateSlot(Player: Player): void;
	SelectSlot(Player: Player, SlotNumber: number): void;
	LoadReplica(Player: Player): {
		profile: Profile<IProfile>;
		replica: Replica;
	};
}
