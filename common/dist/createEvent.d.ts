import { Connection } from "mysql2/promise";
export declare function createEvent(connection: Connection, source: string, type: string, data: string, agentId: string): Promise<any>;
