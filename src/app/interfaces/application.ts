import {Stock} from "./stock";

export interface Application {
  nome: string;
  objetivo: string;
  saldoTotalDisponivel: number;
  indicadorCarencia: string;
  acoes: Array<Stock>;
}
