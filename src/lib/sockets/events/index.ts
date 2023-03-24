import { BasicSocketEvent } from "./BasicEvents.enum";
import { WorkspaceSocketEvent } from "./WorkspaceEvents.enum";

export { BasicSocketEvent, WorkspaceSocketEvent };
export type AllSocketEvents = BasicSocketEvent | WorkspaceSocketEvent;