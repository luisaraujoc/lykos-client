<script setup lang="ts">
import { ref } from 'vue';

const deliveryTime = ref(3);
const revisionCount = ref(2);
const servicePrice = ref(100);
</script>

<template>
    <main class="main-content">
        <div class="container">
            <h1 class="main-title">Seu primeiro Serviço</h1>

            <form class="create-service-form" action="#" method="POST" @submit.prevent>
                <section class="form-section" aria-labelledby="section-title-basic-info">
                    <h2 id="section-title-basic-info" class="sr-only">Informações Básicas do Serviço</h2>

                    <div class="form-group">
                        <label for="service-title">Título do serviço</label>
                        <input type="text" id="service-title" name="service_title" placeholder="Eu criarei um logotipo profissional">
                    </div>

                    <div class="form-row">
                        <div class="form-group form-group--half">
                            <label for="service-category">Categoria</label>
                            <select id="service-category" name="service_category">
                                <option value="" disabled selected>Selecionar uma categoria</option>
                                <option value="design">Design Gráfico</option>
                                <option value="development">Desenvolvimento Web</option>
                            </select>
                        </div>
                        <div class="form-group form-group--half">
                            <label for="service-subcategory">Subcategoria</label>
                            <select id="service-subcategory" name="service_subcategory">
                                <option value="" disabled selected>Selecionar uma subcategoria</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="service-tags">Pesquise tags</label>
                        <input type="text" id="service-tags" name="service_tags" placeholder="Insira até 5 tags">
                    </div>

                    <div class="form-group">
                        <label for="service-description">Descrição do serviço</label>
                        <textarea id="service-description" name="service_description" rows="5" placeholder="O que tem nele? como fazer? quais os benefícios?"></textarea>
                    </div>
                </section>

                <section class="form-section" aria-labelledby="section-title-gallery">
                    <h2 id="section-title-gallery" class="form-section__title">Galeria de Serviços (Portfólio)</h2>
                    <div class="dropzone">
                        <input type="file" id="gallery-upload" name="gallery_files" multiple hidden>
                        <p class="dropzone__text"><strong>Carregar imagens, vídeos e PDFs</strong></p>
                        <p class="dropzone__subtext">Exiba seu melhor trabalho para atrair clientes.</p>
                        <button type="button" class="btn btn--secondary">Upload</button>
                    </div>
                </section>

                <section class="form-section" aria-labelledby="section-title-config">
                    <h2 id="section-title-config" class="form-section__title">Configuração do serviço</h2>
                   <div class="config-list">
    <div class="config-list__item">
        <label for="delivery-time">Prazo de entrega</label>
        <input 
            type="number" 
            id="delivery-time" 
            name="delivery_time" 
            placeholder="Ex: 3 dias"
            min="1"
            v-model="deliveryTime">
    </div>
    <div class="config-list__item">
        <label for="revision-count">Número de revisões</label>
        <input 
            type="number" 
            id="revision-count" 
            name="revision_count" 
            min="0" 
            placeholder="Ex: 2"
            v-model="revisionCount">
    </div>
    <div class="config-list__item">
        <label for="service-price">Preço</label>
        <div class="input-with-symbol">
            <input 
                type="number" 
                id="service-price" 
                name="service_price" 
                placeholder="100"
                min="0"
                step="1"
                v-model="servicePrice">
        </div>
    </div>
</div>
                </section>
                
                <section class="form-section" aria-labelledby="section-title-faq">
                    <h2 id="section-title-faq" class="form-section__title">Perguntas frequentes (FAQ)</h2>
                    <div class="faq-adder">
                        <p class="faq-adder__text"><strong>Adicionar perguntas e respostas comuns</strong></p>
                        <p class="faq-adder__subtext">Ajude os clientes a entender melhor o seu serviço.</p>
                        <button type="button" class="btn btn--secondary">Adicionar FAQ</button>
                    </div>
                    <div id="faq-list"></div>
                </section>

                <div class="form-actions">
                    <button type="submit" class="btn btn--primary btn--large">Serviço de Publicação</button>
                </div>

            </form>
        </div>
    </main>
</template>

<style scoped>
</style>    