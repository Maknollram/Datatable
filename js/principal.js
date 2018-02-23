const app = new Vue({
    el: "#app",
    data: {
    	id: "",
		idEditar: "",
    	nome: "",
		dtNascimento: "",
		dtNascimentoAux: "",
        celular: "Não",
        numeroCel: "",
		mostrarNumero: false,
		mostrarRegistros: true,
        estadoCivil: "",
        sexoSelecionado: "",
        sexo: [
        	{texto: 'Masculino', valor: '0'},
        	{texto: 'Feminino', valor: '1'}
		],
		campoSelecionado: "",
		campos: [
        	{texto: 'Nome', valor: '0'},
        	{texto: 'Data de Nascimento', valor: '1'},
			{texto: 'Idade', valor: '2'},
        	{texto: 'Sexo', valor: '3'},
			{texto: 'Celular', valor: '4'},
        	{texto: 'Número do Celular', valor: '5'},
			{texto: 'Estado Civil', valor: '6'},
        	{texto: 'Observações', valor: '7'}
        ],
		observacoes: "",
		mensagemTabela: "Sem registros",
		filtrar: "",
		ordemColuna: "asc",
		ordemColunaSeta: false,
		colunaPadrao: "nome",
		coluna: "nome",
		registroSelecionado: 5,
        totalRegistrosPorPagina: [
        	{id: 3, numero: 3},
        	{id: 5, numero: 5},
        	{id: 10, numero: 10},
        	{id: 15, numero: 15}
        ],
		paginaAtual: 1,
		paginaAtualizada: 1,
        registrosPorPagina: [],
		totalOrdenacao: "",
        lista: [
            {id: 1, nome: "Jow Lenu", dtNascimento: "20/06/1985", idade: 32, sexo: "Masculino", celular: "Sim",numeroCel: "(21) 98752-6599", estadoCivil: "Casado", observacoes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ."},
            {id: 2, nome: "Lamurog", dtNascimento: "30/01/1995", idade: 22, sexo: "Masculino", celular: "Não",numeroCel: "", estadoCivil: "Casado", observacoes: "Se cansa rápido e tem problemas com autoridades."},
            {id: 3, nome: "Xukika", dtNascimento: "10/11/2007", idade: 10, sexo: "Feminino", celular: "Sim",numeroCel: "(21) 98795-3241", estadoCivil: "Solteira", observacoes: "Fala muito."},
            {id: 4, nome: "Labiboba", dtNascimento: "03/03/1939", idade: 78, sexo: "Feminino", celular: "Não",numeroCel: "", estadoCivil: "Viúva", observacoes: "Coroa bonita."},
            {id: 5, nome: "Crash Rayalison", dtNascimento: "28/02/1992", idade: 25, sexo: "Masculino", celular: "Sim",numeroCel: "(21) 96412-6544", estadoCivil: "Solteiro", observacoes: ""},
            {id: 6, nome: "SpringFildson", dtNascimento: "01/08/1981", idade: 36, sexo: "Masculino", celular: "Não",numeroCel: "", estadoCivil: "Solteiro", observacoes: "Introvertido e inteligente."},
            {id: 7, nome: "Madeinusa", dtNascimento: "15/05/1973", idade: 44, sexo: "Feminino", celular: "Sim",numeroCel: "(21) 98133-7541", estadoCivil: "Casada", observacoes: "Nunca faz nada."},
            {id: 8, nome: "Bing Froid", dtNascimento: "27/09/1952", idade: 65, sexo: "Masculino", celular: "Não",numeroCel: "", estadoCivil: "Casado", observacoes: ""},
            {id: 9, nome: "Ilse", dtNascimento: "15/05/1973", idade: 44, sexo: "Feminino", celular: "Sim",numeroCel: "(21) 98133-7541", estadoCivil: "Casada", observacoes: "Nunca faz nada."},
			{id: 10, nome: "Morgward", dtNascimento: "27/09/1952", idade: 65, sexo: "Masculino", celular: "Não",numeroCel: "", estadoCivil: "Casado", observacoes: ""},
			{id: 11, nome: "Lenu", dtNascimento: "20/06/1985", idade: 32, sexo: "Masculino", celular: "Sim",numeroCel: "(21) 98752-6599", estadoCivil: "Casado", observacoes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ."},
            {id: 12, nome: "Lam", dtNascimento: "30/01/1995", idade: 22, sexo: "Masculino", celular: "Não",numeroCel: "", estadoCivil: "Casado", observacoes: "Se cansa rápido e tem problemas com autoridades."},
            {id: 13, nome: "X", dtNascimento: "10/11/2007", idade: 10, sexo: "Feminino", celular: "Sim",numeroCel: "(21) 98795-3241", estadoCivil: "Solteira", observacoes: "Fala muito."},
            {id: 14, nome: "Labi", dtNascimento: "03/03/1939", idade: 78, sexo: "Feminino", celular: "Não",numeroCel: "", estadoCivil: "Viúva", observacoes: "Coroa bonita."},
            {id: 15, nome: "Rayal", dtNascimento: "28/02/1992", idade: 25, sexo: "Masculino", celular: "Sim",numeroCel: "(21) 96412-6544", estadoCivil: "Solteiro", observacoes: ""}
        ]
	},
	mounted(){
		this.$refs.filtrar.focus()
	},
    watch:{
    	celular: function (){
    		if (this.celular == "Não"){
    			this.numeroCel = ""
    		}
		},
		usuariosPorPagina: function (){
			if (this.usuariosPorPagina.length == 0){
				this.paginaAnterior()
			}
		},
		dtNascimento: function (){
			if (this.dtNascimento.length===10){
				let d = parseInt(this.dtNascimento.split("/")[0].toString())
				let m = parseInt(this.dtNascimento.split("/")[1].toString())
				let a = parseInt(this.dtNascimento.split("/")[2].toString())
				if(a == 0 || a < 100){
					swal({
					  position: 'center',
					  title: 'Ano incorreto!',
					  imageUrl: 'img/warning.jpg',
					  imageWidth: 100,
					  imageHeight: 100,
					  imageAlt: 'Custom image',
					  showConfirmButton: false,
					  timer: 1500
					});
					this.dtNascimento = ""
					return false;
				}
				if(m > 12 || m < 1){
					swal({
					  position: 'center',
					  title: 'O mês não pode ser menor que 1 ou maior que 12!',
					  imageUrl: 'img/warning.jpg',
					  imageWidth: 100,
					  imageHeight: 100,
					  imageAlt: 'Custom image',
					  showConfirmButton: false,
					  timer: 3500
					});
					this.dtNascimento = ""
					return false;
				}
				switch (m) {
				case 2:
					if(a % 4 == 0){
						if(d > 29 || d < 1){
							swal({
							  position: 'center',
							  title: 'O dia não pode ser menor que 1 ou maior que 29!',
							  imageUrl: 'img/warning.jpg',
							  imageWidth: 100,
							  imageHeight: 100,
							  imageAlt: 'Custom image',
							  showConfirmButton: false,
							  timer: 3500
							});
							this.dtNascimento = ""
							return false;
						}
					}else{
						if(d > 28 || d < 1){
							swal({
							  position: 'center',
							  title: 'O dia não pode ser menor que 1 ou maior que 28!',
							  imageUrl: 'img/warning.jpg',
							  imageWidth: 100,
							  imageHeight: 100,
							  imageAlt: 'Custom image',
							  showConfirmButton: false,
							  timer: 3500
							});
							this.dtNascimento = ""
							return false;
						}
					}
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					if(d > 30 || d < 1){
						swal({
							  position: 'center',
							  title: 'O dia não pode ser menor que 1 ou maior que 30!',
							  imageUrl: 'img/warning.jpg',
							  imageWidth: 100,
							  imageHeight: 100,
							  imageAlt: 'Custom image',
							  showConfirmButton: false,
							  timer: 3500
							});
						this.dtNascimento = ""
						return false;
					}
					break;
				default:
					if(d > 31 || d < 1){
						swal({
							  position: 'center',
							  title: 'O dia não pode ser menor que 1 ou maior que 31!',
							  imageUrl: 'img/warning.jpg',
							  imageWidth: 100,
							  imageHeight: 100,
							  imageAlt: 'Custom image',
							  showConfirmButton: false,
							  timer: 3500
							});
						this.dtNascimento = ""
						return false;
					}
					break;
				}
			}
			return true;
		}
    },
    computed:{
		idade: function(){
			if (this.dtNascimento.length===10){
				let dtNasc = this.dtNascimento.split('/')
				let data = new Date(dtNasc[2],dtNasc[1]-1,dtNasc[0])
				let dtHJ = new Date()
				let calcIdade = dtHJ.getFullYear() - data.getFullYear();
				if (dtHJ < new Date(data.getFullYear(), data.getMonth(), data.getDate())){
					swal({
					position: 'center',
					title: 'Data de nascimento maior que a data atual!',
					imageUrl: 'img/warning.jpg',
					imageWidth: 100,
					imageHeight: 100,
					imageAlt: 'Custom image',
					showConfirmButton: false,
					timer: 1500
					})
					this.dtNascimento = ""
					return 
				}
				if ( new Date(dtHJ.getFullYear(), dtHJ.getMonth(), dtHJ.getDate()) < new Date(dtHJ.getFullYear(), data.getMonth(), data.getDate()) ){
					calcIdade--;
				}
				return calcIdade
			}else{
				return ""
			}
		},
    	listaFiltrada: function(){
			if (this.campoSelecionado == ""){
    		return this.ordenacaoInicial.filter(item =>
    			item.nome.toUpperCase().includes(this.filtrar.toUpperCase()) || 
    			item.idade.toString().includes(this.filtrar) || //para integer tem q ter toString
    			item.dtNascimento.includes(this.filtrar) || 
    			item.sexo.toUpperCase().includes(this.filtrar.toUpperCase()) || 
    			item.estadoCivil.toUpperCase().includes(this.filtrar.toUpperCase()) || 
    			item.celular.toUpperCase().includes(this.filtrar.toUpperCase()) || 
    			item.numeroCel.includes(this.filtrar) || 
    			item.observacoes.toUpperCase().includes(this.filtrar.toUpperCase())
			)
			}else if (this.campoSelecionado == "Nome"){
				return this.ordenacaoInicial.filter(item =>
					item.nome.toUpperCase().includes(this.filtrar.toUpperCase())
				)
			}else if (this.campoSelecionado == "Idade"){
				return this.ordenacaoInicial.filter(item =>
					item.idade.toString().includes(this.filtrar)
				)
			}else if (this.campoSelecionado == "Data de Nascimento"){
				return this.ordenacaoInicial.filter(item =>
					item.dtNascimento.includes(this.filtrar)
				)
			}else if (this.campoSelecionado == "Sexo"){
				return this.ordenacaoInicial.filter(item =>
					item.sexo.toUpperCase().includes(this.filtrar.toUpperCase())
				)
			}else if (this.campoSelecionado == "Estado Civil"){
				return this.ordenacaoInicial.filter(item =>
					item.estadoCivil.toUpperCase().includes(this.filtrar.toUpperCase())
				)
			}else if (this.campoSelecionado == "Celular"){
				return this.ordenacaoInicial.filter(item =>
					item.celular.toUpperCase().includes(this.filtrar.toUpperCase())
				)
			}else if (this.campoSelecionado == "Número do Celular"){
				return this.ordenacaoInicial.filter(item =>
					item.numeroCel.includes(this.filtrar)
				)
			}else if (this.campoSelecionado == "Observações"){
				return this.ordenacaoInicial.filter(item =>
					item.observacoes.toUpperCase().includes(this.filtrar.toUpperCase())
				)
			}
    	},
		dataToggle: function() {
			return { 
				'btn-primary': this.celular == 'Sim',
				'btn-default off': this.celular == 'Não'
			}
		},
		iconeTabela: function(){
			return {
				'fa fa-sort-alpha-desc': this.ordemColuna == 'desc',
				'fa fa-sort-alpha-asc': this.ordemColuna == 'asc'
			}
		},
		totalPaginas: function(){
			let paginas = Math.ceil(this.listaFiltrada.length/this.registroSelecionado)
    		return paginas
		},
		usuariosPorPagina: function(){
			if (this.lista.length != 0){
				this.mostrarRegistros = true
			}
			let inicio = (this.paginaAtualizada-1) * this.registroSelecionado
			let fim = inicio + this.registroSelecionado
			this.registrosPorPagina = this.listaFiltrada.slice(inicio, fim)
    		return this.registrosPorPagina
		},
		ordenacaoInicial: function() {
            return _.orderBy(this.lista, this.colunaPadrao, this.ordemColuna)
        },
		ordenacao: function() {
			if(this.usuariosPorPagina.length == 0){
				this.mostrarRegistros = false
			}
            return _.orderBy(this.usuariosPorPagina, this.colunaPadrao, this.ordemColuna)
		},
		totalRegistrosPaginaInicio: function(){
			if (this.lista.length == 0){
				return 0
			}
			let retorno
			if (this.filtrar ==""){
				if (this.registrosPorPagina.length != 0){
					for (let i = 0; i < this.ordenacaoInicial.length; i++) {
						if (this.ordenacaoInicial[i].id == this.registrosPorPagina[0].id){
							retorno = i +1
							break
						}
					}
				}
			}else {
				if (this.registrosPorPagina.length != 0){
					for (let i = 0; i < this.listaFiltrada.length; i++) {
						if (this.listaFiltrada[i].id == this.registrosPorPagina[0].id){
							retorno = i +1
							break
						}
					}
				}
			}
			return retorno
		},
		totalRegistrosPaginaFim: function (){
			if (this.lista.length == 0){
				return 0
			}
			let retorno
			if (this.filtrar ==""){
				if (this.registrosPorPagina.length != 0){
					for (let i = 0; i < this.ordenacaoInicial.length; i++) {
						if (this.ordenacaoInicial[i].id == this.registrosPorPagina[this.registrosPorPagina.length - 1].id){
							retorno = i +1
							break
						}
					}
				}
			}else{
				if (this.registrosPorPagina.length != 0){
					for (let i = 0; i < this.listaFiltrada.length; i++) {
						if (this.listaFiltrada[i].id == this.registrosPorPagina[this.registrosPorPagina.length - 1].id){
							retorno = i +1
							break
						}
					}
				}
			}
			return retorno
		},
		totalRegistros: function(){
			return this.listaFiltrada.length
		}
	},
    methods:{
    	setaPagina(pagina){
			this.paginaAtual = pagina
			this.paginaAtualizada = pagina
    	},
    	primeiraPagina(){
			this.paginaAtual = 1
			this.setaPagina(this.paginaAtual)
		},
		paginaAnterior(){
			this.paginaAtual -= 1
			if(this.paginaAtual < 1){
				this.primeiraPagina()
			}
			this.setaPagina(this.paginaAtual)
		},
		proximaPagina(){
			this.paginaAtual += 1
			if (this.paginaAtual > this.totalPaginas){
				this.ultimaPagina()
			}
			this.setaPagina(this.paginaAtual)
		},
    	ultimaPagina(){
			this.paginaAtual = this.totalPaginas
			this.setaPagina(this.paginaAtual)
		},
		ordenar(coluna){
			if (this.colunaPadrao == coluna) {
                if (this.ordemColuna == 'asc'){
					this.ordemColuna = 'desc'
					this.coluna = coluna
				}else{
					this.ordemColuna = 'asc'
					this.coluna = coluna
				}
            }else{               
                this.colunaPadrao = coluna
                this.ordemColuna = 'asc'
				this.coluna = coluna
            }
		},
    	modalAdd(){
			this.limpaCampos()
			setTimeout(() => { 
				nome.focus() 
			}, 500);
    		$("#modal").modal("show")
    	},
    	modalEditar(id, indice){
    		const procurar = function(lista){
				if(lista.id == id){
					return true
				}
				return false
			}
			let resultado = this.lista.filter(procurar)
			this.id = resultado[0].id
    		this.nome = resultado[0].nome
			this.dtNascimento = resultado[0].dtNascimento
			this.dtNascimentoAux = resultado[0].dtNascimento
    		this.sexoSelecionado = resultado[0].sexo
    		this.celular = resultado[0].celular
    		this.numeroCel = resultado[0].numeroCel
    		this.estadoCivil = resultado[0].estadoCivil
    		this.mudarEstadoCivil()
    		this.observacoes = resultado[0].observacoes
    		this.idEditar = id
    		$("#modalEditar").modal("show")
    	},
    	modalVisualizar(indice){
			let resultado = []
			for (let i = 0; i < this.lista.length; i++) {
				if (this.lista[i].id == indice){
					resultado = this.lista[i]
					break
				}
			}
    		sessionStorage.setItem("resultado", JSON.stringify(resultado));
    		// sessionStorage para um item
    		// sessionStorage.setItem('nome1',resultado.nome)
    		this.visualizar()
    	},
    	visualizar(){
    		var url = "relatorio.html"
    		window.open(url, "MsgWindow", "width=1100, height=700");
		},
    	inserir(){
			this.mudarEstadoCivil()
			if (!this.verificaNumCel()) {
				return
			}
			this.mudaNome()
			if (!this.verificaDtNascimento()) {
				this.dtNascimento = ""
				return
			}
    		this.lista.push({id: this.lista.length+1, nome: this.nome, dtNascimento: this.dtNascimento, idade: this.idade, sexo: this.sexoSelecionado, celular: this.celular, numeroCel: this.numeroCel, estadoCivil: this.estadoCivil, observacoes: this.observacoes})
    		if (this.lista.push()){
        		swal({
                    position: 'center',
                    type: 'success',
                    title: 'Operação realizada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
              	})
        		$("#modal").modal("hide")
            } else {
              swal({
                position: 'center',
                type: 'error',
                title: 'Não foi possível realizar a operação!',
                showConfirmButton: false,
                timer: 1500
              })
    		}
    	},
    	editar(){
			this.dtNascimentoAux 
			this.mudarEstadoCivil()
			if (!this.verificaNumCel()) {
				return
			}
			this.mudaNome()
			if (!this.verificaDtNascimento()) {
				return
			}
			for (let i = 0; i < this.lista.length; i++) {
				if (this.lista[i].id == this.idEditar){
					this.lista[i].id = this.id
					this.lista[i].nome = this.nome
					this.lista[i].dtNascimento = this.dtNascimento
					this.lista[i].idade = this.idade
					this.lista[i].sexo = this.sexoSelecionado
					this.lista[i].celular = this.celular
					this.lista[i].numeroCel = this.numeroCel
					this.lista[i].estadoCivil = this.estadoCivil
					this.lista[i].observacoes = this.observacoes
					break
				}
			}
    		if (this.lista.push()){
        		swal({
                    position: 'center',
                    type: 'success',
                    title: 'Operação realizada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
              	})
              	$("#modalEditar").modal("hide")
            } else {
              swal({
                position: 'center',
                type: 'error',
                title: 'Não foi possível realizar a operação!',
                showConfirmButton: false,
                timer: 1500
              })
    		}
    	},
    	excluir(id){
    		swal({
	            title: 'Tem certeza que deseja deletar este registro?',
	            text: 'Não será possivel desfazer esta operação!',
	            type: 'warning',
	            showConfirmButton: true,
	            showCancelButton: true,
	            focusCancel: true,
	            confirmButtonColor: '#3085d6',
	            cancelButtonColor: '#d33',
	            confirmButtonText: 'Deletar!',
	            cancelButtonText: 'Cancelar!',
	            confirmButtonClass: 'btn btn-success',
					cancelButtonClass: 'btn btn-danger',
					buttonsStyling: false
	        }).then((confirmacao) =>{
				for (let i = 0; i < this.lista.length; i++) {
					if (this.lista[i].id == id){
						if (confirmacao) {
						this.lista.splice(i, 1)
						swal({
							position: 'center',
							type: 'success',
							title: 'Operação realizada com sucesso!',
							showConfirmButton: false,
							timer: 1500
							});
						} else {
						swal({
							position: 'center',
							type: 'error',
							title: 'Não foi possível realizar a operação!',
							showConfirmButton: false,
							timer: 1500
							});
						}
					}
				}
	        });
		},
		dateParse(dataNascimento){
			let dtNasc = dataNascimento.split('/')
			let data = new Date(dtNasc[2],dtNasc[1]-1,dtNasc[0])
			return data
		},
		verificaDtNascimento(){
			if (this.dtNascimento.length!=10){
				swal({
					position: 'center',
					type: 'error',
					title: 'Data de nascimento com menos de 8 dígitos!',
					showConfirmButton: false,
					timer: 1500
				})
				this.dtNascimento = this.dtNascimentoAux
				return false
			}
			return true
		},
		verificaNumCel(){
			if (this.celular == "Sim" && this.numeroCel.length != 15){
				swal({
					position: 'center',
					type: 'error',
					title: 'Número de celular com menos de 11 dígitos!',
					showConfirmButton: false,
					timer: 1500
				  })
				  return false
			}
			return true
		},
		mudaNome(){
			this.nome = this.nome.split(" ").map(n => n.charAt(0).toUpperCase() + n.substr(1).toLowerCase()).join(" ") // Primeira letra de cada palavra maiuscula
		},
		mudarEstadoCivil(){
			if (this.sexoSelecionado == "Feminino"){
    			if (this.estadoCivil == "Casado"){
    				this.estadoCivil = "Casada"
				}else if (this.estadoCivil == "Casada"){
    				this.estadoCivil = "Casado"
    			}else if(this.estadoCivil == "Solteiro"){
    				this.estadoCivil = "Solteira"
				}else if(this.estadoCivil == "Solteira"){
    				this.estadoCivil = "Solteiro"
    			}else if(this.estadoCivil == "Viúva"){
    				this.estadoCivil = "Viúvo"
    			}else if(this.estadoCivil == "Viúvo"){
    				this.estadoCivil = "Viúva"
    			}
    		}
		},
		toggle(){
			this.celular = (this.celular == "Sim") ? "Não" : "Sim"
		},
    	limpaCampos(){
    		this.nome=""
    		this.dtNascimento=""
        	this.sexoSelecionado=""
        	this.mostrarNumero=false
        	this.celular="Não"
        	this.numeroCel=""
        	this.estadoCivil=""
        	this.observacoes=""
    	}
    }
})
