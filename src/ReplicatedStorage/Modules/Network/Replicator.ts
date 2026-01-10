import { Players, ReplicatedStorage, RunService } from "@rbxts/services";

const TSFolder = ReplicatedStorage.WaitForChild("TS");
const Modules = TSFolder.WaitForChild("Modules");
const Network = Modules.WaitForChild("Network");
const RemotesFolder = Network.WaitForChild("Remotes");

type Callback = (...args: unknown[]) => unknown;

interface IRemoteController {
	Fire(...args: unknown[]): unknown;
	Connect(name: string, cb: (...args: unknown[]) => unknown): void;
	Disconnect(name: string): void;
}

class RemoteControllerBase<T extends Instance> {
	public readonly Instance: T;
	protected CallBacks = new Map<string, Callback>();

	constructor(instance: T) {
		this.Instance = instance;
	}

	public Connect(name: string, callBack: Callback) {
		this.CallBacks.set(name, callBack);
	}

	public Disconnect(name: string) {
		this.CallBacks.delete(name);
	}

	protected GetCallback(name: string) {
		return this.CallBacks.get(name);
	}
}

class RemoteEventController extends RemoteControllerBase<RemoteEvent> {
	constructor(instance: RemoteEvent) {
		super(instance);

		if (RunService.IsServer()) {
			this.Instance.OnServerEvent.Connect((player, name, ...args) => {
				const cb = this.GetCallback(tostring(name));
				if (!cb) {
					warn("⛔ Remote", this.Instance.Name, "has no callback for", name);
					return;
				}
				cb(player, ...args);
			});
		} else {
			this.Instance.OnClientEvent.Connect((name, ...args) => {
				const cb = this.GetCallback(tostring(name));
				if (!cb) {
					warn("⛔ Remote", this.Instance.Name, "has no callback for", name);
					return;
				}
				cb(...(args as unknown[]));
			});
		}
	}

	public Fire(name: string, ...args: unknown[]): void;
	public Fire(player: Player, name: string, ...args: unknown[]): void;
	public Fire(a0: string | Player, a1?: unknown, ...rest: unknown[]) {
		if (RunService.IsServer()) {
			const player = a0 as Player;
			const name = a1 as string;

			if (!typeIs(player, "Instance") || !player.IsA("Player")) {
				error(`Remote ${this.Instance.Name}: Fire(player, name, ...) expected Player as first arg on server`);
			}
			this.Instance.FireClient(player, name, ...rest);
		} else {
			const name = a0 as string;
			this.Instance.FireServer(name, a1, ...rest);
		}
	}

	public FireAll(name: string, ...args: unknown[]) {
		if (!RunService.IsServer()) error(`Remote ${this.Instance.Name}: FireAll() only server`);
		this.Instance.FireAllClients(name, ...args);
	}

	public FireInRadius(firePosition: Vector3, radius: number, name: string, ...args: unknown[]) {
		if (!RunService.IsServer()) return;

		for (const player of Players.GetPlayers()) {
			const character = player.Character;
			const primary = character?.PrimaryPart;
			if (!primary) continue;

			if (primary.Position.sub(firePosition).Magnitude < radius) {
				this.Instance.FireClient(player, name, ...args);
			}
		}
	}
}

class BindableEventController extends RemoteControllerBase<BindableEvent> {
	constructor(instance: BindableEvent) {
		super(instance);

		this.Instance.Event.Connect((name, ...args) => {
			const cb = this.GetCallback(tostring(name));
			if (!cb) {
				warn("⛔ Bindable", this.Instance.Name, "has no callback for", name);
				return;
			}
			cb(...(args as unknown[]));
		});
	}

	public Fire(name: string, ...args: unknown[]) {
		this.Instance.Fire(name, ...args);
	}
}

class RemoteFunctionController extends RemoteControllerBase<RemoteFunction> {
	constructor(instance: RemoteFunction) {
		super(instance);

		if (RunService.IsServer()) {
			this.Instance.OnServerInvoke = (player, name, ...args) => {
				const cb = this.GetCallback(tostring(name));
				if (!cb) {
					warn("⛔ RemoteFunction", this.Instance.Name, "has no callback for", name);
					return undefined;
				}
				return cb(player, ...args);
			};
		} else {
			this.Instance.OnClientInvoke = (name, ...args) => {
				const cb = this.GetCallback(tostring(name));
				if (!cb) {
					warn("⛔ RemoteFunction", this.Instance.Name, "has no callback for", name);
					return undefined;
				}
				return cb(...(args as unknown[]));
			};
		}
	}

	public FunctionFire(name: string, ...args: unknown[]): unknown;
	public FunctionFire(player: Player, name: string, ...args: unknown[]): unknown;
	public FunctionFire(a0: string | Player, a1?: unknown, ...rest: unknown[]) {
		if (RunService.IsServer()) {
			const player = a0 as Player;
			const name = a1 as string;

			if (!typeIs(player, "Instance") || !player.IsA("Player")) {
				error(
					`RemoteFunction ${this.Instance.Name}: FunctionFire(player, name, ...) expected Player as first arg on server`,
				);
			}
			return this.Instance.InvokeClient(player, name, ...rest);
		} else {
			const name = a0 as string;
			return this.Instance.InvokeServer(name, a1, ...rest);
		}
	}
}

type AnyController = RemoteEventController | BindableEventController | RemoteFunctionController;

const Remotes = new Map<string, AnyController>();

function CreateController(obj: Instance) {
	if (obj.IsA("RemoteEvent")) {
		const c = new RemoteEventController(obj);
		Remotes.set(obj.Name, c);
		return c;
	}
	if (obj.IsA("BindableEvent")) {
		const c = new BindableEventController(obj);
		Remotes.set(obj.Name, c);
		return c;
	}
	if (obj.IsA("RemoteFunction")) {
		const c = new RemoteFunctionController(obj);
		Remotes.set(obj.Name, c);
		return c;
	}
	return undefined;
}

for (const child of RemotesFolder.GetChildren()) {
	CreateController(child);
}

const Replicator = {
	GetRemote(name: string) {
		return Remotes.get(name) as IRemoteController;
	},
};

export default Replicator;
