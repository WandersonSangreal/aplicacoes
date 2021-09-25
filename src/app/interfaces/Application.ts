import {Stock} from "./Stock";

export interface Application {
  nome: string;
  objetivo: string;
  saldoTotalDisponivel: number;
  indicadorCarencia: string;
  acoes: Array<Stock>;
}
