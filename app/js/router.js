angular
    .module('redeDevClient')
    .config(RedeDevClientConfiguration);

RedeDevClientConfiguration.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
];

function RedeDevClientConfiguration($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('teste1', {
            url: '/teste1',
            templateUrl: `file://${__dirname}/views/teste1.html`
        })
        .state('teste2', {
            url: '/teste2',
            templateUrl: `file://${__dirname}/views/teste2.html`
        });        
}