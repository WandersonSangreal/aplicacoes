import {Application} from "./application";

export interface ApiResponse {
  response: {
    status: string;
    data: {
      listaInvestimentos: Array<Application>
    }
  }
}
