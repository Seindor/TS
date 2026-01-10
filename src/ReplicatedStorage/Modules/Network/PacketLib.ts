import { ReplicatedStorage } from "@rbxts/services";

const Packages = ReplicatedStorage.WaitForChild("Shared").WaitForChild("Packages") as Folder;

// Сигнал (нам достаточно Connect)
export type PacketSignal<Args extends unknown[] = unknown[]> = {
	Connect(cb: (...args: Args) => void): unknown;
};

// Типизированный пакет: Fire/FireClient/OnClientEvent знают Args
export type TypedPacket<Args extends unknown[] = unknown[]> = {
	Name: string;

	OnClientEvent: PacketSignal<Args>;
	OnServerEvent: PacketSignal<[Player, ...Args]>;

	Fire(...args: Args): unknown;
	FireClient(player: Player, ...args: Args): unknown;
};

// То, что реально возвращает require(5uphiPacket): вызываемый объект + Types [file:246]
export type PacketLib = {
	(name: string, ...types: unknown[]): unknown;
	Types: Record<string, unknown>;
};

export const Packet = require(Packages.WaitForChild("5uphiPacket") as ModuleScript) as PacketLib;

// Вот ОНО: TypedPacket(...) — просто обёртка над Packet(...)
export function TypedPacket<Args extends unknown[]>(name: string, ...types: unknown[]): TypedPacket<Args> {
	return Packet(name, ...types) as unknown as TypedPacket<Args>;
}
