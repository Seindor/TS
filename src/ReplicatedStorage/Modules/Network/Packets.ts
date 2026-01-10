import { Packet, TypedPacket } from "./PacketLib";

const Packets = {
	TestScope: {
		TestPacket: TypedPacket<[string]>("Test", Packet.Types.String),
	},
} as const;

export = Packets;
