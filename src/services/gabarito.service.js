import api from "./api";

export async function corrigirGabarito(idProjeto,
    idAluno,
    pagina,
    idGabarito,
    imagem) {
    const formData = new FormData();
    formData.append("imagem", imagem);
    formData.append("idProjeto", idProjeto);
    formData.append("pagina", pagina);
    formData.append("idGabarito", idGabarito);
    formData.append("idAluno", idAluno);

    const { data } = await api.post(
        `/gabarito/corrigir`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );

    return data;
}
