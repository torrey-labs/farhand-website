export interface ServiceLogEntry {
  ts: Date;
  workOrder: string;
  tech: string;
  ip: string;
  clientId: string;
  logPageId: string;
}

export interface Logger {
  append(entry: ServiceLogEntry): Promise<void>;
}
