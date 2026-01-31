import { Players } from "@rbxts/services";

import ProfileStore, { Profile } from "@rbxts/profile-store";
import { Store } from "@rbxts/profile-store";
import { ReplicaServer } from "@rbxts/mad-replica";

import { TokenType } from "ReplicatedStorage/DI/Token";
import { ServerRegistry } from "ServerScriptService/DI/ServerRegistry";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";

import { IProfile, SlotData } from "ReplicatedStorage/SharedInterfaces/IComponents/IProfile";
import { IReplicaData } from "ReplicatedStorage/SharedInterfaces/IComponents/IReplica";

declare global {
	interface Replicas {
		Main: {
			Data: IReplicaData;
			Tags: { UserId: number };
		};
	}
}

const TOKEN = ReplicaServer.Token("Main");

export class ProfileComponent {
	public static Inject = [
		ServerRegistry.Scoped.Templates.SlotTemplate,
		ServerRegistry.Scoped.Templates.ProfileTemplate,
		SharedRegistry.Scoped.Components.SessionComponent,

		SharedRegistry.Singleton.Utilities.TableHelper,
	];

	public Store: Store<IProfile> | undefined;
	public Profile: Profile<IProfile> | undefined;
	public Profiles = new Map<Player, Profile<IProfile>>();

	public Modules: {
		slotTemplate: TokenType<typeof ServerRegistry.Scoped.Templates.SlotTemplate>;
		profileTemplate: TokenType<typeof ServerRegistry.Scoped.Templates.ProfileTemplate>;
		sessionComponent: TokenType<typeof SharedRegistry.Scoped.Components.SessionComponent>;

		tableHelper: TokenType<typeof SharedRegistry.Singleton.Utilities.TableHelper>;
	};

	constructor(
		slotTemplate: TokenType<typeof ServerRegistry.Scoped.Templates.SlotTemplate>,
		profileTemplate: TokenType<typeof ServerRegistry.Scoped.Templates.ProfileTemplate>,
		sessionComponent: TokenType<typeof SharedRegistry.Scoped.Components.SessionComponent>,

		tableHelper: TokenType<typeof SharedRegistry.Singleton.Utilities.TableHelper>,
	) {
		this.Modules = {
			slotTemplate,
			profileTemplate,
			sessionComponent,

			tableHelper,
		};
	}

	public LoadProfile(Player: Player) {
		if (this.Profiles.has(Player)) {
			return this.Profiles.get(Player) as Profile<IProfile>;
		}

		this.Store = ProfileStore.New<IProfile, Player>("Test", this.Modules.profileTemplate!());
		this.Profile = this.Store.StartSessionAsync(tostring(Player.UserId), {
			Cancel: () => {
				return Player.Parent !== Players;
			},
		});

		if (this.Profile !== undefined) {
			this.Profile.AddUserId(Player.UserId);
			this.Profile.Reconcile();

			for (const [i, slot] of pairs(this.Profile.Data.Slots as unknown as Record<number, SlotData>)) {
				this.Modules.tableHelper!.deepFillMissing(slot, this.Modules.slotTemplate!());
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
			Data: {
				Profile: profile.Data,
				Session: this.Modules.sessionComponent!.LoadSession(_Player),
			} as IReplicaData,
			Tags: { UserId: _Player.UserId } as { UserId: number },
		});

		replica.Replicate();

		return replica;
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
			Profile.Data.Slots[Profile.Data.Account.SlotCount] = this.Modules.slotTemplate!();
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
