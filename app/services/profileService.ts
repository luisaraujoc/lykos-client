// app/services/profileService.ts
import type { AxiosInstance } from "axios";

export const ProfileService = (api: AxiosInstance) => ({
    // Envia o formulário com a foto (Multipart)
    becomeFreelancer(formData: FormData) {
        return api.post("/profiles/become-freelancer/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    // Busca lista de idiomas para o Select
    getIdiomas(search?: string) {
        return api.get("/profiles/idiomas/", { params: { search } });
    },

    // Busca lista de skills para o Autocomplete
    getSkills(search?: string) {
        return api.get("/profiles/habilidades/", { params: { search } });
    }
});