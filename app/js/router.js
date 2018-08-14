angular
    .module('redeDevClient')
    .config(RedeDevClientConfiguration);

RedeDevClientConfiguration.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
];

function RedeDevClientConfiguration($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('geradores', {
            url: '/geradores',
            templateUrl: `file://${__dirname}/components/geradores/geradores.view.html`,
            controller: 'geradoresController'
        });        
}