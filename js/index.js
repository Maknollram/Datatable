const app = new Vue({
    el: "#app",
    data: {
        usuarios: [
            {id: "0", nome: "Admin", senha: "123", perfil: "admin"},
            {id: "1", nome: "padrao", senha: "123", perfil: "padrao"},
            {id: "2", nome: "visualizador", senha: "123", perfil: "visualizador"}
        ],
        nomeLogin: "",
        senha: ""
    },
    mounted(){
		this.$refs.nomeLogin.focus()
	},
    methods:{
        logar(){
            if (this.nomeLogin == ""){
                swal({
                    position: 'center',
                    type: 'info',
                    title: 'Digite o nome de usuário!',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }
            if (this.senha == ""){
                swal({
                    position: 'center',
                    type: 'info',
                    title: 'Digite a senha de usuário!',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }
            const arrUsuario = this.usuarios.filter(usuario => usuario.nome == this.nomeLogin && usuario.senha == this.senha)
            if (arrUsuario.length === 0) {
                swal({
                    position: 'center',
                    type: 'error',
                    title: 'Dados incorretos!',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }
            sessionStorage.setItem('usuario', JSON.stringify(arrUsuario[0]))
            const url = "principal.html"
            window.location = url
            this.limparCampos()
        },
        limparCampos(){
            this.nomeLogin = ""
            this.senha = ""
        }
    }
})
