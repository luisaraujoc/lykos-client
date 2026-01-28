export type TipoUsuario = 'CLIENTE' | 'FREELANCER' | 'ADMIN';
export type TipoEndereco = 'RESIDENCIAL' | 'COMERCIAL' | 'OUTRO';

export interface Pessoa {
    nome_completo: string;
    cpf?: string;
    data_nascimento?: string;
    telefone: string;
}

export interface Endereco {
    tipo: TipoEndereco;
    logradouro: string;
    numero: string;
    complemento?: string;
    cep: string;
    cidade: string;
    estado: string;
}

export interface Usuario {
    id: number;
    nome_usuario: string;
    email: string;
    tipo: TipoUsuario;
    status: string;
    data_criacao: string;
    pessoa?: Pessoa;
    enderecos?: Endereco[];

    // Campos visuais que AINDA NÃO EXISTEM no backend
    avatar_url?: string;
    bio?: string;
}