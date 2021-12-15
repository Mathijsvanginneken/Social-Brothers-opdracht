import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import bannerImage from "../public/bannerImage.png";
import { AiOutlineCamera } from "react-icons/ai";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

export const Home = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    category_id: "",
    image: null,
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log("newdata", newdata);
  }

  function handleImageChange(e) {
    setData({
      image: e.target.files[0],
    });
  }

  function submit(e) {
    e.preventDefault();
    console.log(data);
    let form_data = new FormData();
    form_data.append("title", data.title);
    form_data.append("content", data.content);
    form_data.append("category_id", parseInt(data.content));
    form_data.append("image", data.image);
    let url = "https://frontend-case-api.sbdev.nl/api/posts";
    axios
      .post(url, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: "pj11daaQRz7zUIH56B9Z",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(4);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 1);
  };

  async function fetchData() {
    const response = await axios.get(
      "https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=5",
      {
        headers: {
          "Content-Type": "application/json",
          token: "pj11daaQRz7zUIH56B9Z",
        },
      }
    );
    setItems(response.data.data);
  }

  useEffect(() => fetchData(), []);

  console.log(items);

  const fileInput = useRef(null);

  return (
    <div className="flex md:flex-col sm:w-auto flex-row items-center">
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <div className="imageSize">
        <Image src={bannerImage} alt="Banner Image" />
      </div>
      <div id="pageWidth">
        <div className="formColor flex md:flex-row sm:flex-col sm:w-auto p-12 ">
          <div className="form bg-white p-6">
            <h1 className="formText block mb-6">Plaats een blog bericht</h1>
            <form>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-lg text-gray-900"
                  for="first_name"
                >
                  Berichtnaam
                </label>
                <input
                  className="formColor py-2 px-3 text-grey-800"
                  type="text"
                  name="first_name"
                  id="title"
                  placeholder="Geen titel"
                  value={data.title}
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-lg text-gray-900"
                  for="Select"
                >
                  Categorie
                </label>
                <select
                  className="formColor formInput py-2 px-3"
                  type="select"
                  id="category_id"
                  value={data.category_id}
                  onChange={(e) => handle(e)}
                >
                  <option>Geen categorie</option>
                  <option value="1">Tech</option>
                  <option value="2">Nieuws</option>
                  <option value="3">Sports</option>
                  <option value="4">Lokaal</option>
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-lg text-gray-900"
                  for="File"
                >
                  Header afbeelding
                </label>
                <input
                  className="border py-2 px-3 text-grey-800"
                  type="file"
                  name="image"
                  accept="image/png"
                  multiple={false}
                  ref={fileInput}
                  id="image"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <div className="styledButton">
                  <AiOutlineCamera />
                  <motion.button
                    onClick={() => fileInput.current.click()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="roundedButton bg-gray-600 hover:bg-gray-700 text-white  border rounded-full"
                  >
                    Kies bestand
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-lg text-gray-900"
                  for="textarea"
                >
                  Bericht
                </label>
                <textarea
                  className="formTextArea border py-2 px-3 text-grey-800"
                  name="textarea"
                  id="content"
                  value={data.content}
                  onChange={(e) => handle(e)}
                ></textarea>
              </div>
              <motion.button
                className="formButton block hover:bg-orange-600 text-white mx-auto "
                onClick={submit}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Bericht aanmaken
              </motion.button>
            </form>
          </div>

          <div class="blogs bg-white">
            <div className="cards m-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.slice(0, visible).map((item) => (
                <div class="card bg-white overflow-hidden flex flex-col ">
                  <div>
                    <div className="cardImage relative">
                      <img src={item.img_url} />
                      <div className="Pos flex flex-row justify-between items-end m-2 mt-8 z-10">
                        <p id="cardImageText">
                          {item.created_at.split("T")[0]}
                        </p>
                        <p id="cardImageText">{item.category.name}</p>
                      </div>
                    </div>
                    <div className="cardTextSize m-4">
                      <h1>{item.title}</h1>
                      <p>{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <motion.button
              className="formButton block hover:bg-orange-600 text-white mx-auto "
              onClick={showMoreItems}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Meer laden{" "}
            </motion.button>
          </div>
        </div>
        <footer className="footer">
          <AiOutlineCopyrightCircle />
          <p className="footerText">Copyright Social Brothers - 2020</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
