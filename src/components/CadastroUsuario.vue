<script setup lang="ts">
import { ref } from 'vue';
import navBarCadastros from './navBarCadastros.vue';

const form = ref({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
})

function handleSubmit(){
    try{
        // Verifica se os campos obrigatórios estão preenchidos
        if (!form.value.nome || !form.value.email || !form.value.senha || !form.value.confirmarSenha) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        //verifica senhas
        if (form.value.senha !== form.value.confirmarSenha){
            alert('As senhas não coincidem.');
            return;
        } 
        
        // verifica senhas
        if (form.value.senha.length < 8) {
            alert('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        // verifica email
        if (!form.value.email.includes('@')) {
            alert('Por favor, insira um email válido.');
            return;
        }
    } catch (error) {
        console.error('Erro ao comparar senhas:', error);
        return;
    }
    
    console.log('Formulário enviado:', form.value);


}

</script>

<template>

    <!--Logica da tela de cadastro de usuario, iniciando com o navBarCadastros-->
    <navBarCadastros />
    <body>
        <div class="flex items-center justify-center min-h-screen flex-col max-w-800 mx-auto p-4">
            <h1 class="text-2xl font-bold mb-6 text-center">
                Crie sua conta
            </h1>
            <!--formulario de cadastro de usuario-->
            <form class="max-w-xl w-full mx-auto" @submit.prevent="handleSubmit" >
                <!--campo nome-->
                <div class="w-full py-4">
                    <label for="nome" class="block text-left font-medium">Nome Completo</label>
                    <input type="text"  id="nome" name="nome" v-model="form.nome" required placeholder="Entre com seu nome completo"  >
                </div>
                <!--campo email-->
                <div class="w-full py-4">
                    <label for="email" class="block text-left font-medium">Email</label>
                    <input type="email" id="email" name="email" v-model="form.email" required placeholder="Entre com seu email">
                </div>
                <!--campo senha-->
                <div class="w-full py-4">
                    <label for="senha" class="block text-left font-medium">Senha</label>
                    <input type="password" id="senha" name="senha" v-model="form.senha" required placeholder="Entre com sua senha">
                </div>
                <!--campo confirmar senha-->
                <div class="w-full py-4">
                    <label for="confirmarSenha" class="block text-left font-medium">Confirmar Senha</label>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" v-model="form.confirmarSenha" required placeholder="Confirme sua senha">
                </div>
                <button type="submit" class="btn-primary-solid w-full py-2 bg-[var(--color-laranja)] text-white rounded-lg" >Inscrever-se</button>
            </form>
            <a href="" class="mb-6 mt-6" id="links">Já tem uma conta?</a>
            <button id="entrar"><a href="" id="links">Entrar</a></button>
        </div>
    </body>
</template>

<!--Estilos especificos do cadastro de usuario-->
<style>

h1, label{
    color:#171717;
}
input {
    width: 100%;
    height: 56px;
    padding: 0 16px;
    border: 1px solid;
    border-radius: 12px;
    color: var(--color-laranja);
    box-sizing: border-box;
}

input::placeholder{
    font-size: 16px;
    color: #94824F;
    width: 100%;
}

#entrar{

    height: 56px;
    border: 1px solid;
    border-radius: 6px;
    color: var(--color-laranja);
    padding: 5px 25px;
}
#links {
    color: #94824F;
    text-decoration: none;
}
</style>