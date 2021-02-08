// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    baseUrl: 'https://api.octopus.markets',
    production: false,
    hmr: false,
    firebaseConfig: {
        apiKey: 'AIzaSyDrSxsc2Qa-VqNIS3vMQRLTyBM2DGf4k-Q',
        authDomain: 'octo-mkt.firebaseapp.com',
        projectId: 'octo-mkt',
        storageBucket: 'octo-mkt.appspot.com',
        messagingSenderId: '161745183051',
        appId: '1:161745183051:web:5dc085549a760fbcf148ce',
        measurementId: 'G-XEBP2BKKLP',
    },
    stripeKey: 'pk_live_51IGQwJEkLTSFmURGEOXTHqgYcfSPU2N7SaJ96ZalMmyuV4gREZE8MzisLQ5yLIbehVFaLpsJydJmCOsOwwMBErlt00otUr3k02',
    secretKey: 'sk_test_51IGQwJEkLTSFmURGrBTbyBdl3c0nuTGKsw8zX4idTavIX3O0dWZX7A4JLcZfy9cq2gbydph43m0vdxxopPmxKdi9008wlCZOyd'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
