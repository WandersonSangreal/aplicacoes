// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dialogs: {
    titles: {
      error: "ERRO!",
      rescueSuccess: "RESGATE EFETUADO COM SUCESSO!"
    },
    messages: {
      rescueSuccess: "O valor solicitado estará em sua conta em até 5 dias úteis.",
      rescueValueBigger: "O valor digitado está acima do disponível. Tente um valor menor!",
      rescueTotalValueBigger: "O valor total solicitado acima do disponível. Tente novamente!",
      rescueTotalValueLess: "O valor total solicitado está negativo ou zerado. Não é possível fazer resgates!",
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
