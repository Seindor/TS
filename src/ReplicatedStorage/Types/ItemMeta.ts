import { BaseMeta } from "./BaseMeta";

export type WeaponMeta = BaseMeta & {
	Kind: "Weapon";
	Damage: number;
	Upgrade: number;
};

export type ArmorMeta = BaseMeta & {
	Kind: "Armor";
	Defense: number;
	Upgrade: number;
};

export type ConsumableMeta = BaseMeta & {
	Kind: "Consumable";
	Charges?: number;
};

export type MaterialMeta = BaseMeta & {
	Kind: "Material";
};

export type RobuxItemMeta = BaseMeta & {
	Kind: "RobuxItem";
	ProductId: number;
};

export type ItemMeta = WeaponMeta | ArmorMeta | ConsumableMeta | MaterialMeta | RobuxItemMeta;
