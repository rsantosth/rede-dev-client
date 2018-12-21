angular
    .module('redeDevClient')
    .controller('criptografiaController', CriptografiaController);

CriptografiaController.$inject = [
    '$scope'
];

function CriptografiaController($scope) {
    $scope.sha = {
        valor: null,
        hash: null
    }

    $scope.md5 = {
        valor: null,
        hash: null
    }

    $scope.fn = {
        hashSHA1: HashSHA1,
        hashMD5: HashMD5
    }

    function HashSHA1() {
        if ($scope.sha.valor) {
            const sha1 = require('js-sha1');

            var hash = sha1.create();
            hash.update($scope.sha.valor);
            $scope.sha.hash = hash.hex().toUpperCase();
        }
    }

    function HashMD5() {
        if ($scope.md5.valor) {
            const md5 = require('md5');
            $scope.md5.hash = md5($scope.md5.valor);
        }
    }
}