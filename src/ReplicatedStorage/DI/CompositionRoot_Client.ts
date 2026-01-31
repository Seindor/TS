import { Container } from "ReplicatedStorage/DI/Container";

import { Shared_SingletonComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_SingletonComposition";
import { Shared_ScopedComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_ScopedComposition";
import { Shared_TransientComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_TransientComposition";

import { Client_ScopedComposition } from "./Compositions/Client/Client_ScopedComposition";
import { Client_SingletonComposition } from "./Compositions/Client/Client_SingletonComposition";
import { Client_TransientComposition } from "./Compositions/Client/Client_TransientComposition";

export const CompositionRootClient = new Container();

Shared_SingletonComposition(CompositionRootClient);
Shared_ScopedComposition(CompositionRootClient);
Shared_TransientComposition(CompositionRootClient);

Client_SingletonComposition(CompositionRootClient);
Client_ScopedComposition(CompositionRootClient);
Client_TransientComposition(CompositionRootClient);
