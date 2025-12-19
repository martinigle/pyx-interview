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
  servicio: TService;
  canal: TChannel;
  estadoActual: TServiceState;
  instalador: string;
  cliente: string;
  creadoPor: string;
  fechaCreacion: string;
  fechaUltimaActualizacion: string;
}

export interface IIncidentForm {
  titulo: string;
  descripcion: string;
  servicio: string;
  canal: string;
  instalador: string;
  cliente: string;
}

export const EService = {
  INTERNET: "INTERNET",
  PHONE: "TELEFONIA",
  MPLS: "MPLS",
  OTRO: "OTRO",
} as const;

export type TService = (typeof EService)[keyof typeof EService];

export const EChannel = {
  WEB: "WEB",
  CALLCENTER: "CALL_CENTER",
  WPP: "WHATSAPP",
  EMAIL: "EMAIL",
  COMMERCIAL: "COMERCIAL",
} as const;

export type TChannel = (typeof EChannel)[keyof typeof EChannel];

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
