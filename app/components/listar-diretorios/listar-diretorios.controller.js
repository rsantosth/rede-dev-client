const { dialog } = require('electron').remote;

angular
    .module('redeDevClient')
    .controller('listarDiretoriosController', ListarDiretoriosController);

ListarDiretoriosController.$inject = [
    '$scope'
];

function ListarDiretoriosController($scope) {
    $scope.vm = {
        exibirPastas: false,
        caminhoPasta: '',
        mensagemBusca: '',
        listaArquivos: [],
        diretorioValido: false,
        buscaRealizada: false
    }

    $scope.fn = {
        abrirFolderDialog: AbrirFolderDialog,
        listarArquivos: ListarArquivos
    };

    function AbrirFolderDialog() {
        dialog.showOpenDialog({properties: ['openDirectory']}, function(filepaths) {
            if (filepaths && filepaths.length > 0) {
                $scope.vm.caminhoPasta = filepaths[0];

                ListarArquivos();
            }
        });
    }

    function ListarArquivos() {
        try {
            $scope.vm.listaArquivos = walkSync($scope.vm.caminhoPasta);
            $scope.vm.diretorioValido = true;
            $scope.vm.mensagemBusca = `Foram encontrados ${$scope.vm.listaArquivos.length} arquivos.`;
        } catch (error) {
            $scope.vm.listaArquivos = [];
            $scope.vm.diretorioValido = false;
            $scope.vm.mensagemBusca = 'Ocorreu um erro ao tentar listar os arquivos.'
        } finally {
            $scope.vm.buscaRealizada = true;
        }

        $scope.$apply();
    }

    function walkSync(dir, filelist) {
        var path = path || require('path');
        var fs = fs || require('fs'),
            files = fs.readdirSync(dir);
        var filelist = filelist || [];
        files.forEach(function(file) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                if ($scope.vm.exibirPastas)
                    filelist.push(path.join(dir, file));

                filelist = walkSync(path.join(dir, file), filelist);
            }
            else {
                filelist.push(path.join(dir, file));
            }
        });
        return filelist;
    };
}