let page1 = async() => {
    const url = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '53884f416emshc339773a62ef8ccp1164f7jsn03e04bc97ae0',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return (result);
    } catch (error) {
        return (error);
    }
}

let video = async() => {
    let videosPage = await page1();
    videosPage = JSON.parse(videosPage);
    let videos = videosPage.contents;

    let videoHTML  = document.querySelector("#main1");
    videoHTML.innerHTML = "";
    videoHTML.insertAdjacentHTML("beforeend", /*html*/`
    <div class="videos-container">
    ${videos.map(value => {
        if (value.video && value.video.movingThumbnails) {
            return /*html*/`
                <button type="button">
                    <img class="miniatura" src="${(value.video.thumbnails[0]).url}" alt="thumbnail">
                    <img class="miniatura-movible" src="${(value.video.movingThumbnails[0]).url}" alt="movthumbnail">
                    <div class="division">
                        <img src="./img/creativeCode.jpg" alt="Logo">
                        <div class="video-informacion">
                            <div class="video-titulo">${value.video.title}</div>
                            <div class="video-canal">CreativeCode</div>
                            <div class="d-flex">
                                <div class="video-views">${value.video.stats.views} views <strong>•</strong></div>
                                <div class="video-fecha">${value.video.publishedTimeText}</div>
                            </div>
                        </div>
                    </div>
                </button>`
        } else if (value.video && !value.video.movingThumbnails) {
            return /*html*/`
                <button type="button">
                    <img class="miniatura" src="${(value.video.thumbnails[0]).url}" alt="thumbnail">
                    <img class="miniatura-movible" src="${(value.video.thumbnails[0]).url}" alt="movthumbnail">
                    <div class="division">
                        <img src="./img/creativeCode.jpg" alt="Logo">
                        <div class="video-informacion">
                            <div class="video-titulo">${value.video.title}</div>
                            <div class="video-canal">CreativeCode</div>
                            <div class="d-flex">
                                <div class="video-views">${value.video.stats.views} views</div>
                                <div class="video-fecha">${value.video.publishedTimeText}</div>
                            </div>
                        </div>
                    </div>
                </button>`;
        } else {
            return 'No hay videos disponibles.'
        }
    }).join("")}
    </div>`)
}
video();



























let searchAt = async () => {
    const input = document.querySelector("#searchbox").value;
    const url = `https://youtube138.p.rapidapi.com/search/?q=${input}&hl=en&gl=US`;
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '53884f416emshc339773a62ef8ccp1164f7jsn03e04bc97ae0',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return (result);
    } catch (error) {
        console.error(error);
        return null;
    }
}

let videoInfo = async(id) => {
    const url = `https://youtube138.p.rapidapi.com/video/details/?id=${id}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '53884f416emshc339773a62ef8ccp1164f7jsn03e04bc97ae0',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return (result);
    } catch (error) {
        console.error(error);
    }
}

let comentario = async (id) => {
    const url = `https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '53884f416emshc339773a62ef8ccp1164f7jsn03e04bc97ae0',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return (result);
    } catch (error) {
        console.error(error);
        return "Los comentarios están desactivados.";
    }
}

let relatedVideo = async (id) => {
    const url = `https://youtube138.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '53884f416emshc339773a62ef8ccp1164f7jsn03e04bc97ae0',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return (result);
    } catch (error) {
        return null;
    }
}

let page = async() => {
    let pageInformation = await searchAt();
    pageInformation = JSON.parse(pageInformation);

    let videoID = pageInformation.contents[0].video.videoId;

    let videoInformacion = await videoInfo(videoID);
    videoInformacion = JSON.parse(videoInformacion);

    let videoClic = await page1();
    videoClic = JSON.parse(videoClic);

    videoURL = `https://www.youtube.com/embed/${videoID}?&autoplay=1`;
    const videoHTML = document.querySelector("#myVideo");
    videoHTML.setAttribute('src', videoURL);
    
    let videoRelacionados = await relatedVideo(videoID);
    videoRelacionados = JSON.parse(videoRelacionados);
    let relacionados = videoRelacionados.contents;

    let videoComentarios = await comentario(videoID);
    videoComentarios = JSON.parse(videoComentarios);
    let comentarios = videoComentarios.comments;

    let recomendadosHTML = document.querySelector("#myRecomendados");
    recomendadosHTML.innerHTML = "";
    recomendadosHTML.insertAdjacentHTML("beforeend", /*html*/`
    <div class="recomendados">
        ${relacionados.map(value => {
            if (value.video) {
                return /*html*/`
                <div class="recomendados-box">
                    <img class="recomendados-miniatura" src="${value.video.thumbnails[0].url}" alt="Miniatura">
                    <div class="recomendados-informacion">
                        <div class="recomendados-title">${value.video.title}</div>
                        <div class="recomendados-channel">${value.video.author.title}</div>
                        <div class="d-flex justify-content-start">
                            <div class="recomendados-views">${value.video.stats.views} vistas <strong>·</strong></div>
                            <div class="recomendados-date">${value.video.publishedTimeText}</div>
                        </div>
                        
                    </div>
                </div>
                `
            }
            else {
                return;
            }
        }).join("")}
    </div>`);

    let descripcionHTML = document.querySelector("#myDescripcion");
    descripcionHTML.innerHTML = "";
    descripcionHTML.insertAdjacentHTML("beforeend", /*html*/`
    <div class="descripcion">
        <div class="descripcion-title">${videoInformacion.title}</div>
        <div class="descripcion-main">
            <div class="descripcion-canal-informacion">
                <img src="${videoInformacion.author.avatar[0].url}" alt="Avatar">
                <div class="descripcion-canal-texto">
                    <div class="descripcion-canal">${videoInformacion.author.title}</div>
                    <div class="descripcion-subs">495 suscriptores</div>
                </div>
                <a class="suscribirse" href="#">Suscribirse</a>
            </div>
            <div class="descripcion-likes">
                <div class="like">
                    <a href="#">
                    <i class='bx bx-like' ></i>
                    <div class="descripcion-like">${videoInformacion.stats.likes}</div>
                    </a>
                </div>
                <div class="dislike">
                    <a href="#"><i class='bx bx-dislike dislikebtn-desktop'></i></a>
                </div>
            </div>
            <div class="descripcion-compartir">
                <a href="#">
                    <i class='bx bx-share bx-flip-horizontal'></i>
                    <div>Compartir</div>
                </a>
            </div>
            <div class="puntos">
                <a href="#"><i class='bx bx-dots-horizontal-rounded'></i></a>
            </div>
        </div>
        <div class="descripcion-info">
            <div class="descripcion-top">
                <div class="vistas">${videoInformacion.stats.views}</div>
                <div class="date">${pageInformation.contents[0].video.publishedTimeText}</div>
            </div>
            <div class="descripcion-bottom">${videoInformacion.description}</div>
        </div>
    </div>`)

    let comentariosHTML = document.querySelector("#myComentarios");
    comentariosHTML.innerHTML = "";
    comentariosHTML.insertAdjacentHTML("beforeend", /*html*/`
    <div class="comentarios-cantidad">${videoComentarios.totalCommentsCount} comentarios</div>
    <div class="comentarios-box">
    ${comentarios.map(value => /*html*/`
        <div class="comentario-full">
            <div class="comentario">
                <img src="${value.author.avatar[0].url}" alt="Foto Perfil Autor">
                <div class="comentario-complete">
                    <div class="comentario-contenido">
                        <a href="#" class="comentario-autor">${value.author.title}</a>
                        <div class="comentario-date">${value.publishedTimeText}</div>
                    </div>
                    <div class="contenido">${value.content}</div>
                    <div class="comentarios-likes">
                        <a href="#" class='comentarios-like bx bx-like like'></a>
                        <div class="likes-cantidad">${value.stats.votes}</div>
                        <a href="#" class='comentarios-dislike bx bx-dislike dislike'></a>
                        <a href="#" class="comentarios-responder">Responder</a>
                    </div>
                </div>
            </div>
            <div>
                <a href="#" class='comentarios-puntos bx bx-dots-vertical'></a>
            </div>
        </div>
        `).join("")}
    </div>`);
}

const input = document.querySelector("#searchbox");
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && document.activeElement === input) {
        const main2 = document.querySelector('#main2');
        main2.style.display = 'block';
        const main1 = document.querySelector('#main1');
        main1.style.display = 'none';
        page();
    }
});

const videito = document.querySelector("#videitos");
videito.addEventListener('click', function(event) {
    document.querySelector("#main1").style.display = 'none';
    document.querySelector("#main2").style.display = 'block';
});