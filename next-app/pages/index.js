import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'      
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from "react";
import { motion } from "framer-motion";

var FormData = require('form-data');

export default function Home() {
    const [title, setTitle] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [content, setContent] = useState("");

let formData = new FormData();

const onFileChange = (e) => {
  console.log(e.target.files[0])
  if (e.target && e.target.files[0]){
    formData.append("file", e.target.files[0]);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", category_id);
  }
}

const SubmitFileData = () => {
  axios.post('https://frontend-case-api.sbdev.nl/api/posts', {headers: {'token' : 'pj11daaQRz7zUIH56B9Z'}}, {formData})
  .then (res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error)
  })
}

//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     // var file = e.target.files[0];
//     // var imageType = /image.*/;

//     // if (!file.type.match(imageType)) return;

//     let formdata = new FormData()
//     formdata.append("title", title);
//     formdata.append("content", content);
//     formdata.append("category_id", category_id);
//     formdata.append("file", e.target.files[0]);

// var requestOptions = {
//   method: 'POST',
//   body: formdata,
//   redirect: 'follow',
//   url: 'https://frontend-case-api.sbdev.nl/api/posts',
//   headers: {'token' : 'pj11daaQRz7zUIH56B9Z'},
// };

//   fetch(requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// }

//     async function onSubmitForm(values) {
//     let config = {
//       method: 'post',
//       url: 'https://frontend-case-api.sbdev.nl/api/posts',
//       headers: {'Content-Type': 'application/json', 'token' : 'pj11daaQRz7zUIH56B9Z'},
//       data: values,
//     };

//     try {
//       const response = await axios(config);
//       console.log(response);
//       if (response.status == 200) {
//         reset();
//       }
//     } catch (err) {}
  
  
  return (
 <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

  <main className={styles.main}>
  <div className="flex justify-center items-center w-full bg-#F4F4F4">
    <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Plaats een blog bericht</h1>
        <form>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" for="first_name">Berichtnaam</label>
                <input className="border py-2 px-3 text-grey-800" 
                type="text" 
                name="first_name" 
                id="first_name"
                placeholder="Geen titel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" for="Select">Select</label>
                <select className="categorie border py-2 px-3 text-grey-800"
                value={category_id} onChange= {e => setCategory_id(e.target.value)}
                >
                    <option>Geen categorie</option>
                    <option value="1">Tech</option>
                    <option value="2">Nieuws</option>
                    <option value="3">Sports</option>
                    <option value="4">Lokaal</option>
                </select>
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" for="File">Header afbeelding</label>
                <input className="border py-2 px-3 text-grey-800" type="file" name="file" id="file"
                   onChange={onFileChange}
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" for="textarea">bericht</label>
                <textarea className="border py-2 px-3 text-grey-800" name="textarea" id="textarea"
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <motion.button className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto p-4 rounded" 
            onClick = {SubmitFileData}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Bericht aanmaken</motion.button>
        </form>
    </div>
    </div>
   </main>
   

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>

        Copyright Social Brothers - 2020
        </p>
      </footer>
    </div>
  )
}