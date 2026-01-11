import { Container } from "ReplicatedStorage/DI/Container";

import { Server_ScopedComposition } from "ServerScriptService/DI/Compositions/Server_ScopedComposition";
import { Server_SingletonComposition } from "./Compositions/Server_SignletonComposition";
import { Shared_SingletonComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_SingletonComposition";

export const CompositionRootServer = new Container();

Shared_SingletonComposition(CompositionRootServer);

Server_ScopedComposition(CompositionRootServer);
Server_SingletonComposition(CompositionRootServer);
