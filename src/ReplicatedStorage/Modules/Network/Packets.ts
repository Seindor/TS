import { Packet, TypedPacket } from "./PacketLib";

const Packets = {
	Player: {
		LoadReplica: TypedPacket<[string]>("LoadReplica"),
	},
} as const;

export = Packets;
