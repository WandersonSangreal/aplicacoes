import {Application} from "./Application";

export interface ApiResponse {
  response: {
    status: string;
    data: {
      listaInvestimentos: Array<Application>
    }
  }
}
