import urls from "configs/urls";

export default {
  uploadImage: (data) => {
      console.log(data);
      return fetch(urls.upload.image, {
          method: "POST",
          body: data
      }).then(res => res.json());
  }

}