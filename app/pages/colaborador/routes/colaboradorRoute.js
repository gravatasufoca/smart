define([], function (app) {
    var routes = [
        {
            module: 'colaborador',
            view: 'consulta',
            text: 'Consultar colaborador',
            controller: 'consultaController',
            state: {
                name: "colaborador",
                url: "colaborador"
            },
            roles: ['*']
        },
        {
            module: 'colaborador',
            view: 'manter',
            text: 'Cadastrar colaborador',
            controller: 'manterController',
            state: {
                name: "colaborador.cadastrar",
                url: "cadastrar"
            },
            roles: ['*']
        },
        {
            module: 'colaborador',
            view: 'manter',
            text: 'Alterar colaborador',
            controller: 'manterController',
            state: {
                name: "colaborador.alterar",
                url: "alterar/:id"
            },
            roles: ['*']
        },
        {
            module: 'colaborador',
            view: 'visualizarColaborador',
            text: 'Visualizar colaborador',
            controller: 'visualizarColaboradorController',
            state: {
                name: "colaborador.visualizar",
                url: "visualizar/:id"
            },
            roles: ['*']
        }];

    return routes;
});