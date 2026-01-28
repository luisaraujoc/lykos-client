// app/composables/useBecomeSeller.ts
import { ProfileService } from "~/services/profileService";
import type { AxiosError, AxiosInstance } from "axios";

// Tipos locais para o formulário
export interface IdiomaItem {
    nome: string;
    nivel: string;
}

export interface FormacaoItem {
    titulo: string;
    instituicao: string;
    ano: string;
}

export const useBecomeSeller = () => {
    const { $api } = useNuxtApp();
    const toast = useToast();
    const router = useRouter();

    // Instancia o serviço
    const profileService = ProfileService($api as AxiosInstance);

    // --- ESTADO GERAL ---
    const loading = ref(false);

    // Estado do formulário
    const form = reactive({
        nome: '',
        descricao: '',
        photoFile: null as File | null,
        photoPreview: null as string | null,
        skills: [] as string[],
        idiomas: [] as IdiomaItem[],
        formacoes: [] as FormacaoItem[]
    });

    // Campos temporários (inputs de controle)
    const tempSkill = ref('');
    const tempIdioma = reactive({ nome: '', nivel: 'BASICO' });
    const tempFormacao = reactive({ titulo: '', instituicao: '', ano: '' });

    // --- ESTADO DE REFERÊNCIA ---
    const availableIdiomas = ref<{ nome: string, iso_codigo: string }[]>([]);
    const availableSkills = ref<{ nome: string }[]>([]);

    // --- CARREGAMENTO INICIAL ---
    const fetchReferenceData = async () => {
        try {
            const [idiomasRes, skillsRes] = await Promise.all([
                profileService.getIdiomas(),
                profileService.getSkills()
            ]);

            // Ajuste de segurança caso a API retorne paginação
            const idiomasData = idiomasRes.data.results || idiomasRes.data;
            const skillsData = skillsRes.data.results || skillsRes.data;

            availableIdiomas.value = Array.isArray(idiomasData) ? idiomasData : [];
            availableSkills.value = Array.isArray(skillsData) ? skillsData : [];

        } catch (e) {
            console.error("Erro ao carregar dados de referência (Seed)", e);
        }
    };

    onMounted(() => {
        fetchReferenceData();
    });

    // --- AÇÕES DE MÍDIA ---
    const handlePhotoSelect = (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.add({
                title: 'Arquivo muito grande',
                description: 'A imagem deve ter no máximo 5MB.',
                color: 'error'
            });
            return;
        }

        form.photoFile = file;

        const reader = new FileReader();
        reader.onload = (e) => form.photoPreview = e.target?.result as string;
        reader.readAsDataURL(file);
    };

    // --- AÇÕES DE LISTAS ---
    const addSkill = () => {
        const val = tempSkill.value.trim();
        if (val && !form.skills.includes(val)) {
            form.skills.push(val);
            tempSkill.value = '';
        }
    };

    const removeSkill = (skill: string) => {
        form.skills = form.skills.filter(s => s !== skill);
    };

    const addIdioma = () => {
        if (tempIdioma.nome && tempIdioma.nivel) {
            const exists = form.idiomas.some(i => i.nome === tempIdioma.nome);
            if (!exists) {
                form.idiomas.push({ ...tempIdioma });
                tempIdioma.nome = '';
                tempIdioma.nivel = 'BASICO';
            } else {
                toast.add({ title: 'Aviso', description: 'Este idioma já foi adicionado.', color: 'orange' });
            }
        }
    };

    const removeIdioma = (index: number) => {
        form.idiomas.splice(index, 1);
    };

    const addFormacao = () => {
        if (tempFormacao.titulo && tempFormacao.instituicao && tempFormacao.ano) {
            form.formacoes.push({ ...tempFormacao });
            tempFormacao.titulo = '';
            tempFormacao.instituicao = '';
            tempFormacao.ano = '';
        }
    };

    const removeFormacao = (index: number) => {
        form.formacoes.splice(index, 1);
    };

    // --- SUBMIT ---
    const submit = async () => {
        if (!form.nome || !form.descricao || !form.photoFile || form.skills.length === 0) {
            toast.add({
                title: 'Campos obrigatórios',
                description: 'Por favor, inclua sua foto, nome, bio e pelo menos uma habilidade.',
                color: 'error'
            });
            return;
        }

        loading.value = true;

        try {
            const formData = new FormData();

            // === CORREÇÃO DOS NOMES DOS CAMPOS AQUI ===
            // O Frontend deve enviar as chaves que o Serializer espera, não as do banco

            formData.append('nome', form.nome);           // Serializer: nome = serializers.CharField()
            formData.append('descricao', form.descricao); // Serializer: descricao = serializers.CharField()
            formData.append('fotoPerfil', form.photoFile);// Serializer: fotoPerfil = serializers.ImageField()

            // Listas
            form.skills.forEach(s => formData.append('skills', s));

            // JSONs Complexos
            formData.append('idiomas', JSON.stringify(form.idiomas));
            formData.append('formacoes', JSON.stringify(form.formacoes));

            // Envia
            await profileService.becomeFreelancer(formData);

            toast.add({
                title: 'Parabéns!',
                description: 'Seu perfil de freelancer foi criado com sucesso.',
                color: 'success',
                icon: 'i-heroicons-check-badge'
            });

            router.push('/selling/gigs/create');

        } catch (error: any) {
            const err = error as AxiosError;
            console.error("Erro no submit:", err);

            // Extração de erro mais detalhada do DRF (que retorna field errors)
            let msg = 'Ocorreu um erro ao processar sua solicitação.';
            const data = err.response?.data as any;

            if (data) {
                // Se for erro de campo específico (ex: { nome: ["Obrigatório"] })
                const firstErrorKey = Object.keys(data)[0];
                if (firstErrorKey && Array.isArray(data[firstErrorKey])) {
                    msg = `${firstErrorKey}: ${data[firstErrorKey][0]}`;
                } else if (data.detail) {
                    msg = data.detail;
                }
            }

            toast.add({
                title: 'Erro ao criar perfil',
                description: msg,
                color: 'error'
            });
        } finally {
            loading.value = false;
        }
    };

    return {
        form,
        loading,
        tempSkill,
        tempIdioma,
        tempFormacao,
        availableIdiomas,
        availableSkills,
        handlePhotoSelect,
        addSkill,
        removeSkill,
        addIdioma,
        removeIdioma,
        addFormacao,
        removeFormacao,
        submit
    };
};