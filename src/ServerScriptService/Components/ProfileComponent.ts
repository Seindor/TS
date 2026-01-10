import { Players } from "@rbxts/services";

import ProfileStore, { Profile } from "@rbxts/profile-store";
import { Store } from "@rbxts/profile-store";
import { ReplicaServer } from "@rbxts/mad-replica";
import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";

import { CreateProfileTemplate } from "ServerStorage/Templates/ProfileTemplate";
import { CreateSlottemplate } from "ServerStorage/Templates/SlotTemplate";

import { IProfile, SlotData } from "ReplicatedStorage/Interfaces/IComponents/IProfile";

declare global {
	interface Replicas {
		PlayerData: {
			Data: IProfile;
			Tags: { UserId: number };
		};
	}
}

const TOKEN = ReplicaServer.Token("PlayerData");

export class ProfileComponent {
	public Store: Store<IProfile> | undefined;
	public Profile: Profile<IProfile> | undefined;
	public Profiles = new Map<Player, Profile<IProfile>>();

	public LoadProfile(Player: Player) {
		this.Store = ProfileStore.New<IProfile, Player>("Test", CreateProfileTemplate());
		this.Profile = this.Store.StartSessionAsync(tostring(Player.UserId), {
			Cancel: () => {
				return Player.Parent !== Players;
			},
		});

		if (this.Profile !== undefined) {
			this.Profile.AddUserId(Player.UserId);
			this.Profile.Reconcile();

			for (const [i, slot] of pairs(this.Profile.Data.Slots as unknown as Record<number, SlotData>)) {
				TableHelper.deepFillMissing(slot, CreateSlottemplate());
			}

			this.Profile.OnSessionEnd.Connect(() => {
				this.Profiles.delete(Player);
				Player.Kick("Profile Session end, please rejoin!");
			});

			if (Player.Parent === Players) {
				this.Profiles.set(Player, this.Profile);
				print(`Profile Loaded for ${Player.Name} / ${Player.UserId}`);
			} else {
				this.Profile.EndSession();
			}
		} else {
			Player.Kick("Profile load fail - Please rejoin!");
		}
		return this.Profile;
	}

	public LoadReplica(_Player: Player) {
		const profile = this.LoadProfile(_Player);

		const replica = ReplicaServer.New({
			Token: TOKEN,
			Data: profile.Data as IProfile,
			Tags: { UserId: _Player.UserId } as { UserId: number },
		});

		if (!_Player.Character) {
			_Player.CharacterAdded.Once((_Character) => {
				replica.Subscribe(_Player);
				replica.Replicate();
			});
		} else {
			replica.Subscribe(_Player);
			replica.Replicate();
		}

		//ПЕРЕПИШИ ПОТОМ: КОГДА КЛИЕНТ ЗАГРУЗИЛСЯ, ПУСТИ С НЕГО ИВЕНТ И ТОЛЬКО ПОТОМ ДЕЛАЙ ПОДПИСКУ

		return { profile, replica };
	}

	public CreateSlot(_Player: Player) {
		const Profile = this.Profiles.get(_Player);
		if (!Profile) {
			warn(`Cannot find Profile for ${_Player.Name} / ${_Player.UserId}.`);
			return;
		}

		if (Profile.Data.Account.SlotCount < Profile.Data.Account.PurchasedSlotCount) {
			Profile.Data.Account.SlotCount += 1;
		}

		if (!Profile.Data.Slots[Profile.Data.Account.SlotCount]) {
			Profile.Data.Slots[Profile.Data.Account.SlotCount] = CreateSlottemplate();
			warn(`Created Slot ${Profile.Data.Account.SlotCount} for ${_Player.Name} / ${_Player.UserId}`);
			this.SelectSlot(_Player, Profile.Data.Account.SlotCount);
		} else {
			warn(`${_Player.Name} / ${_Player.UserId} Already have Slot on: ${Profile.Data.Account.SlotCount}.`);
			return;
		}
	}

	public SelectSlot(_Player: Player, SlotNumber: number) {
		const Profile = this.Profiles.get(_Player);
		if (!Profile) {
			warn(`Cannot find Profile for ${_Player.Name} / ${_Player.UserId}.`);
			return;
		}

		if (Profile.Data.Account.ActiveSlotId === SlotNumber) {
			warn(`Already selected ${SlotNumber}.`);
			return;
		}

		if (!Profile.Data.Slots[SlotNumber]) {
			warn(`Cannot find Slot ${SlotNumber} in Slots.`);
			return;
		}

		Profile.Data.Account.ActiveSlotId = SlotNumber;
	}
}
