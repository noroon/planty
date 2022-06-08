import { useState } from 'react';
import axios from '../config/axiosConfig';

export default function ImageUpload() {
  async function postImage({ image, description }) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    console.log(image);

    const result = await axios.post('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result.data;
  }

  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    // console.log(file);
    const result = await postImage({ image: file, description });
    setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const img = event.target.files[0];
    setFile(img);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*" />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>

      {images.map((image) => (
        <div key={image}>
          <img src={image} alt="" />
        </div>
      ))}

      <img src="/images/9fa06d3c5da7aec7f932beb5b3e60f1d" alt="" />
    </div>
  );
}
