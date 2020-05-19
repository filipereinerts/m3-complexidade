let execucoes = [];

function createInstance(){

    let maquinas = Math.round((Math.random() * 2) + 1) * 10;
    let tarefas = Math.floor(Math.pow(maquinas, Math.floor((Math.random() * 1) + 1.5)));

    if(maquinas === 0 || tarefas === 0) return createInstance();

    return {
        maquinas,
        tarefas
    }

}

function initProblem(){

    let instance = createInstance();

    let problem = [];

    for (var i = 0; i < instance.maquinas; i++) {
        problem[i] = [];
    }

    for (var i = 0; i < instance.tarefas; i++) {
        
        let maquina = Math.floor(Math.random() * instance.maquinas);

        problem[maquina].push(Math.floor(Math.random() * 100) + 1);

     }

     return problem;

}

function primeiraMelhora(problem){

    let it = 0;
    let makespan = 0;
    let melhorMakeSpan;

    let retorno = {
        algoritimo: "Primeira Melhora",
        inicio: Date.now(),
        iteracoes: 0,
        maquinas: problem.length,
        tarefas: _.reduce(_.map(problem, (p) => _.reduce(p, (a, b) => a + b, 0)), (a, b) => a + b, 0)
    };

    while(it < 1000){

        retorno.iteracoes++;

        let sum = _.map(problem, function(p){

            return _.reduce(p, (memo, num) => memo + num, 0);
    
        });
    
        makespan = _.max(sum);

        if(melhorMakeSpan === undefined || melhorMakeSpan > makespan){
            melhorMakeSpan = makespan;
            it = 0; 
        }

        let piorMaquina = _.indexOf(sum, makespan);

        let tarefa = problem[piorMaquina].pop();

        if(problem[piorMaquina + 1] !== undefined){
            problem[piorMaquina + 1].push(tarefa);
        } else {
            problem[0].push(tarefa);
        }

        it++;

    }

    retorno.fim = Date.now();
    retorno.duracao = retorno.fim - retorno.inicio;
    retorno.makespan = makespan;
    retorno.melhorMakeSpan = melhorMakeSpan;

    return retorno;

}

function melhorMelhora(problem){

    let retorno = {
        algoritimo: "Melhor Melhora",
        inicio: Date.now(),
        iteracoes: 0,
        maquinas: problem.length,
        tarefas: _.reduce(_.map(problem, (p) => _.reduce(p, (a, b) => a + b, 0)), (a, b) => a + b, 0)
    };

    let it = 0;
    let makespan = 0;
    let melhorMakeSpan;

    while(it < 1000){

        retorno.iteracoes++;

        let sum = _.map(problem, function(p){

            return _.reduce(p, (memo, num) => memo + num, 0);
    
        });
    
        makespan = _.max(sum);

        if(melhorMakeSpan === undefined || melhorMakeSpan > makespan){
            melhorMakeSpan = makespan;
            it = 0; 
        }

        let piorMaquina = _.indexOf(sum, makespan);

        let tarefa = _.max(problem[piorMaquina]);

        problem[piorMaquina].splice(_.indexOf(problem[piorMaquina], tarefa), 1);

        if(problem[piorMaquina + 1] !== undefined){
            problem[piorMaquina + 1].push(tarefa);
        } else {
            problem[0].push(tarefa);
        }

        it++;

    }

    retorno.duracao = Date.now() - retorno.inicio;
    delete(retorno['inicio']);
    retorno.makespan = melhorMakeSpan;

    return retorno;

}

function primeiraMelhora(problem){

    let it = 0;
    let makespan = 0;
    let melhorMakeSpan;

    let retorno = {
        algoritimo: "Primeira Melhora",
        inicio: Date.now(),
        iteracoes: 0,
        maquinas: problem.length,
        tarefas: _.reduce(_.map(problem, (p) => _.reduce(p, (a, b) => a + b, 0)), (a, b) => a + b, 0)
    };

    while(it < 1000){

        retorno.iteracoes++;

        let sum = _.map(problem, function(p){

            return _.reduce(p, (memo, num) => memo + num, 0);
    
        });
    
        makespan = _.max(sum);

        if(melhorMakeSpan === undefined || melhorMakeSpan > makespan){
            melhorMakeSpan = makespan;
            it = 0; 
        }

        let piorMaquina = _.indexOf(sum, makespan);

        let tarefa = problem[piorMaquina].pop();

        if(problem[piorMaquina + 1] !== undefined){
            problem[piorMaquina + 1].push(tarefa);
        } else {
            problem[0].push(tarefa);
        }

        it++;

    }

    retorno.duracao = Date.now() - retorno.inicio;
    delete(retorno['inicio']);
    retorno.makespan = melhorMakeSpan;

    return retorno;

}

function buscaTabu(problem){

    let retorno = {
        algoritimo: "Buca Tabu",
        inicio: Date.now(),
        iteracoes: 0,
        maquinas: problem.length,
        tarefas: _.reduce(_.map(problem, (p) => _.reduce(p, (a, b) => a + b, 0)), (a, b) => a + b, 0)
    };

    let listaTabu = _.map(problem, function(_){
        return 0;
    });

    let it = 0;
    let makespan = 0;
    let melhorMakeSpan;

    while(it < 1000){

        retorno.iteracoes++;

        listaTabu.forEach(function(tabu, k){
            if(listaTabu[k] > 0) listaTabu[k]--; 
        });

        let sum = _.map(problem, function(p, k){
            if(listaTabu[k] > 0) return 0;
            return _.reduce(p, (memo, num) => memo + num, 0);
        });
    
        makespan = _.max(sum);

        if(makespan === 0) continue;

        if(melhorMakeSpan === undefined || melhorMakeSpan > makespan){
            melhorMakeSpan = makespan;
            it = 0; 
        }

        let piorMaquina = _.indexOf(sum, makespan);

        listaTabu[piorMaquina] = Math.floor(Math.random() * (0.09 - 0.01) + 0.01 * retorno.maquinas);

        let tarefa = _.max(problem[piorMaquina]);

        problem[piorMaquina].splice(_.indexOf(problem[piorMaquina], tarefa), 1);

        let novaMaquina = piorMaquina + 1;

        while(problem[novaMaquina] === undefined || listaTabu[novaMaquina] > 0){
            novaMaquina++;
            if(problem[novaMaquina] === undefined) novaMaquina = 0;
        }

        problem[novaMaquina].push(tarefa);

        listaTabu[novaMaquina] = listaTabu[piorMaquina];

        it++;

    }

    retorno.duracao = Date.now() - retorno.inicio;
    delete(retorno['inicio']);
    retorno.makespan = melhorMakeSpan;

    return retorno;

}

function run(){

    execucoes = [];

    let problem = initProblem();

    for(let i = 0; i < 10; i++){
        execucoes.push(primeiraMelhora(problem));
        execucoes.push(melhorMelhora(problem));
        execucoes.push(buscaTabu(problem));
    }

    $('.download').show();
    
    makeGraph();

}

function downloadFile() {

    let filename = 'teste.txt';
    let text = JSON.stringify(execucoes);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);

  }

  function makeGraph(){

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Heurísticas e Meta Heurísticas'
        },
        subtitle: {
            text: 'Resultados'
        },
        xAxis: {
            categories: _.unique(_.map(execucoes, 'algoritimo')),
            crosshair: true
        },
        series: [
            {
                name: 'Iterações',
                data: _.map(_.groupBy(execucoes, 'algoritimo'), function(porAlgoritimo){
                    return _.reduce(_.map(porAlgoritimo, 'iteracoes'), (a, b) => a+b) / porAlgoritimo.length;
                })
            },
            {
                name: 'Duração',
                data: _.map(_.groupBy(execucoes, 'algoritimo'), function(porAlgoritimo){
                    return _.reduce(_.map(porAlgoritimo, 'duracao'), (a, b) => a+b) / porAlgoritimo.length;
                })
            },
            {
                name: 'Makespan',
                data: _.map(_.groupBy(execucoes, 'algoritimo'), function(porAlgoritimo){
                    return _.reduce(_.map(porAlgoritimo, 'makespan'), (a, b) => a+b) / porAlgoritimo.length;
                })
            },
            {
                name: 'Maquinas',
                data: _.map(_.groupBy(execucoes, 'algoritimo'), function(porAlgoritimo){
                    return _.reduce(_.map(porAlgoritimo, 'maquinas'), (a, b) => a+b) / porAlgoritimo.length;
                })
            },
            {
                name: 'Tarefas',
                data: _.map(_.groupBy(execucoes, 'algoritimo'), function(porAlgoritimo){
                    return _.reduce(_.map(porAlgoritimo, 'tarefas'), (a, b) => a+b) / porAlgoritimo.length;
                })
            }
        ]
    });

  }