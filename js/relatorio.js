const relat = new Vue({
    el: "#app",
    data: {
        // nome: "",
        lista:[]
    },
    mounted(){
        let resultado = JSON.parse(sessionStorage.getItem('resultado'))
        if (resultado.celular == "Não"){
                resultado.numeroCel = "Não possui celular."
        }
        if (resultado.observacoes == ""){
            resultado.observacoes = "Não há observações."
        }
        // Para somente um item
        // let nome = sessionStorage.getItem('nome1')
        // this.nome = nome
        this.lista = resultado
    },
    methods:{
        imprimir(){
            window.print()
            window.close()
        }
    }
})