let page = async() => {
    const url = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c930438bbamshf4fd06c44aa586cp1f7f03jsn1cbafc6e2720',
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
    let videosPage = await page();
    videosPage = JSON.parse(videosPage);
    let videos = videosPage.contents;

    let videoHTML  = document.querySelector("#videos");
    videoHTML.innerHTML = "";
    videoHTML.insertAdjacentHTML("beforeend", /*html*/`
    <div class="videos-container">
    ${videos.map(value => {
        if (value.video && value.video.movingThumbnails) {
            return /*html*/`
                <a href="player.html?value=${value.video.videoId}">
                    <img class="miniatura" src="${(value.video.thumbnails[0]).url}" alt="thumbnail">
                    <img class="miniatura-movible" src="${(value.video.movingThumbnails[0]).url}" alt="movthumbnail">
                    <div class="division">
                        <img src="./img/creativeCode.jpg" alt="Logo">
                        <div class="video-informacion">
                            <div class="video-titulo">${value.video.title}</div>
                            <div class="video-canal">CreativeCode</div>
                            <div class="video-views">${value.video.stats.views} views</div>
                            <div class="video-fecha">${value.video.publishedTimeText}</div>
                        </div>
                    </div>
                </a>`
        } else if (value.video && !value.video.movingThumbnails) {
            return /*html*/`
                <a href="player.html?value=${value.video.videoId}">
                    <img class="miniatura" src="${(value.video.thumbnails[0]).url}" alt="thumbnail">
                    <img class="miniatura-movible" src="${(value.video.thumbnails[0]).url}" alt="movthumbnail">
                    <div class="division">
                        <img src="./img/creativeCode.jpg" alt="Logo">
                        <div class="video-informacion">
                            <div class="video-titulo">${value.video.title}</div>
                            <div class="video-canal">CreativeCode</div>
                            <div class="video-views">${value.video.stats.views} views</div>
                            <div class="video-fecha">${value.video.publishedTimeText}</div>
                        </div>
                    </div>
                </a>`;
        } else {
            return 'No hay videos disponibles.'
        }
    }).join()}
    </div>`)
}
video();