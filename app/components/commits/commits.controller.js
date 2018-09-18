const git = require('simple-git');
const moment = require('moment');
const mkdirp = require('mkdirp');
const {shell} = require('electron')

angular
    .module('redeDevClient')
    .controller('commitsController', CommitsController);

CommitsController.$inject = [
    '$scope'
];

function CommitsController($scope) {
    $scope.vm = {
        caminhoPasta: '',
        repositorioValido: false,
        commitValido: false,
        executarPull: false,
        commitId: '',
        commitList: [],
        commitFiles: []
    }

    $scope.fn = {
        abrirFolderDialog: AbrirFolderDialog,
        buscarCommit: BuscarCommit,
        copiarArquivos: CopiarArquivos
    };

    function AbrirFolderDialog() {
        dialog.showOpenDialog({properties: ['openDirectory']}, function(filepaths) {
            if (filepaths && filepaths.length > 0) {
                $scope.vm.caminhoPasta = filepaths[0];

                git($scope.vm.caminhoPasta).checkIsRepo(function(err, isRepo) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!isRepo) {
                        alert('Não foi encontrado um repositório Git no diretório selecionado.');
                        return;
                    }

                    if ($scope.vm.executarPull) {
                        $scope.$apply();
                        git($scope.vm.caminhoPasta).pull(function(err, summary) {
                            if (err) {
                                alert('Ocorreu um erro ao tentar baixar as últimas atualizações.');
                                console.log('erro ao executar git pull: ', err);
                                return;
                            }

                            alert('Repositório atualizado com sucesso.')
                            $scope.vm.repositorioValido = true;
                            $scope.$apply();
                        })
                    } else {
                        $scope.vm.repositorioValido = true;
                        $scope.$apply();
                    }
                });
            }
        });
    }

    function BuscarCommit() {
        if ($scope.vm.commitId) {

            $scope.vm.commitList = [];
            $scope.vm.commitId.split(';').forEach(function(item) {
                git($scope.vm.caminhoPasta).show([
                    '-s', '--pretty=format:%H|%an|%aD|%s', 
                    item
                ], function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
    
                    var commitData = result.split('|');
                    if (commitData.length > 0) {
                        var commitInfo = {
                            hash: commitData[0],
                            autor: commitData[1],
                            data: moment(commitData[2]),
                            descricao: commitData[3]
                        };

                        getCommitFileList(commitInfo.hash, function (err, result) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            $scope.vm.commitFiles.push({
                                id: commitInfo.hash,
                                files: result
                            });
                        });

                        $scope.vm.commitList.push(commitInfo);
                        $scope.vm.commitValido = true;
                    }
                
                    $scope.$apply();
                });
            });
        }
    }

    function CopiarArquivos() {
        dialog.showOpenDialog({properties: ['openDirectory']}, function(filepaths) {
            if (filepaths && filepaths.length > 0) {
                var caminhoArquivos = filepaths[0];
                var fs = require('fs');
                var path = require('path');

                angular.forEach($scope.vm.commitFiles, function(item, key) {
                    if (item.files && item.files.length > 0) {
                        for (var i=0; i<item.files.length; i++) {
                            var sourceFile = `${$scope.vm.caminhoPasta}\\${item.files[i]}`;
                            var destination = `${caminhoArquivos}\\${path.dirname(item.files[i])}\\`;
                            var filename = path.basename(item.files[i]);

                            mkdirp.sync(destination);
                            let readStream = fs.createReadStream(sourceFile);
                            readStream.pipe(fs.createWriteStream(destination + filename));                            
                        }
                    }
                });

                alert('Cópia de arquivos finalizada.')
                shell.openItem(caminhoArquivos);
            }
        });
    }

    function getCommitFileList(commitHash, callback) {
        git($scope.vm.caminhoPasta).raw([
            'diff-tree',
            '--no-commit-id',
            '--name-only',
            '-r',
            commitHash
        ], function(err, result) {
            var fileList = [];

            if (result) {
                fileList = result.split('\n');
                fileList.pop();
            }

            callback(err, fileList);
        })
    }
}