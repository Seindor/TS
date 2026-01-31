import { Container } from "ReplicatedStorage/DI/Container";

import { Server_ScopedComposition } from "ServerScriptService/DI/Compositions/Server_ScopedComposition";
import { Server_SingletonComposition } from "./Compositions/Server_SignletonComposition";
import { Shared_SingletonComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_SingletonComposition";
import { Shared_ScopedComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_ScopedComposition";
import { Shared_TransientComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_TransientComposition";

export const CompositionRootServer = new Container();

Shared_SingletonComposition(CompositionRootServer);
Shared_ScopedComposition(CompositionRootServer);
Shared_TransientComposition(CompositionRootServer);

Server_ScopedComposition(CompositionRootServer);
Server_SingletonComposition(CompositionRootServer);
