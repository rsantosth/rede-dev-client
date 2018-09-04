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
        })
        .state('listar-diretorios', {
            url: '/listar-diretorios',
            templateUrl: `file://${__dirname}/components/listar-diretorios/listar-diretorios.view.html`,
            controller: 'listarDiretoriosController'
        })
        .state('commits', {
            url: '/commits',
            templateUrl: `file://${__dirname}/components/commits/commits.view.html`,
            controller: 'commitsController'
        });
}