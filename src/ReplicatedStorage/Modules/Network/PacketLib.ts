import { ReplicatedStorage } from "@rbxts/services";
const TSFolder = ReplicatedStorage.WaitForChild("TS");

const Packages = TSFolder.WaitForChild("Shared").WaitForChild("Packages") as Folder;

export type PacketSignal<Args extends unknown[] = unknown[]> = {
	Connect(cb: (...args: Args) => void): unknown;
};

export type TypedPacket<Args extends unknown[] = unknown[]> = {
	Name: string;

	OnClientEvent: PacketSignal<Args>;
	OnServerEvent: PacketSignal<[Player, ...Args]>;

	Fire(...args: Args): unknown;
	FireClient(player: Player, ...args: Args): unknown;
};

export type PacketLib = {
	(name: string, ...types: unknown[]): unknown;
	Types: Record<string, unknown>;
};

export const Packet = require(Packages.WaitForChild("5uphiPacket") as ModuleScript) as PacketLib;

export function TypedPacket<Args extends unknown[]>(name: string, ...types: unknown[]): TypedPacket<Args> {
	return Packet(name, ...types) as unknown as TypedPacket<Args>;
}
