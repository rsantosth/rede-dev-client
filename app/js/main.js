angular
    .module('redeDevClient', [
        'ui.router'
    ]);

function boot() {
    angular.bootstrap(document, ['redeDevClient'], {
        strictDi: true
    });
}

document.addEventListener('DOMContentLoaded', boot);  