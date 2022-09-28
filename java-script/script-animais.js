const API_KEY ='563492ad6f917000010000018f8b3c8be53c4b3fb0ae7c4ad0334bb5';

class PhotoGallery{
    constructor(){
        this.API_KEY ='563492ad6f917000010000018f8b3c8be53c4b3fb0ae7c4ad0334bb5';
        this.galleryDIv =document.querySelector('.gallery');
        this.searchForm =document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.eventHandle();
    }
    eventHandle(){
        document.addEventListener('DOMContentLoaded',()=>{
            this.getImg();

        });
        this.searchForm.addEventListener('submit', (e)=>{
            this.getSearchedImages(e);
        })
    }
    async getImg(){
        const baseURL ='https://api.pexels.com/v1/search?query=dog&per_page=30';
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        console.log(data)

    }

    async fetchImages(baseURL){
        const response = await fetch(baseURL,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: this.API_KEY
            }
        });
        const data = await response.json();
        return data;
    }
    GenerateHTML(photos){
        photos.forEach(photo => {
            const item =document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
             <a href='#'>
                <img src="${photo.src.medium}">
             </a>
             <h3>${photo.id}</h3>
            `;
            this.galleryDIv.appendChild(item)
        })
    }
    /*async getSearchedImages(e){
        e.preventDefault();
        this.galleryDIv.innerHTML='';
        e.target.reset();
        const searchValue = e.target.querySelector('input').value;
        const baseURL = await `https://api.pexels.com/v1/search?query=${searchValue}&per_page=12`
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
    }*/
}
const gallery =new PhotoGallery;