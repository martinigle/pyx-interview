export interface IUser {
  rol: string;
  id: string;
  nombre: string;
  email: string;
}

export interface IIncident {
  id: string;
  titulo: string;
  descripcion: string;
  servicio: EService;
  canal: EChannel;
  estadoActual: TServiceState;
  instalador: string;
  cliente: string;
  creadoPor: string;
  fechaCreacion: string;
  fechaUltimaActualizacion: string;
}

export interface IIncidentForm {
  title: string;
  description: string;
  service: string;
  channel: string;
  installer: string;
  client: string;
}

const EService = {
  INTERNET: "INTERNET",
  PHONE: "TELEFONIA",
  MPLS: "MPLS",
  OTRO: "OTRO",
};

export type EService = (typeof EService)[keyof typeof EService];

const EChannel = {
  WEB: "WEB",
  CALLCENTER: "CALL_CENTER",
  WPP: "WHATSAPP",
  EMAIL: "EMAIL",
  COMMERCIAL: "COMERCIAL",
};

export type EChannel = (typeof EChannel)[keyof typeof EChannel];

export const EServiceStates = {
  NEW: "NUEVO",
  ANALYSIS: "EN_ANALISIS",
  ASSIGNED: "ASIGNADO",
  ONGOING: "EN_CURSO",
  WAITING_CLIENT: "ESPERANDO_CLIENTE",
  WAITING_PROVIDER: "ESPERANDO_PROVEEDOR",
  RESOLVED: "RESUELTO",
  CLOSED: "CERRADO",
  CANCELLED: "CANCELADO",
} as const;

export type TServiceState =
  (typeof EServiceStates)[keyof typeof EServiceStates];
