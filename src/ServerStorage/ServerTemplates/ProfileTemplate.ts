import TableHelper from "ReplicatedStorage/Modules/Utilities/TableHelper";
import { IProfile, SlotData } from "ReplicatedStorage/SharedInterfaces/IComponents/IProfile";

const ProfileTemplate = {
	Account: {
		ActiveSlotId: 0,
		ActiveSlot: {} as SlotData,
		SlotCount: 0,
		PurchasedSlotCount: 1,

		Settings: {
			HoldClick: false,
			AutoRun: false,

			MusicVolume: 1,
			SfxVolume: 1,

			ShowDamage: false,
		},

		Achievements: {},
	},
	Slots: {},
} as IProfile;

export type ProfileTemplate = typeof ProfileTemplate;

export function CreateProfileTemplate(): ProfileTemplate {
	return TableHelper.deepClone(ProfileTemplate);
}
