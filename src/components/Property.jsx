import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alerts } from "../utils/alerts";
import useInput from "../hooks/useInput";
import Navbar from "./Navbar";
import { setUser } from "../state/userState";

function Property() {
  const user = useSelector((state) => state.user);
  const uid = user.id;
  const pid = useParams().id;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [description, setDescription] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [disponibility, setDisponibility] = useState("");
  const [modRes, setModRes] = useState(false);
  const [like, setLike] = useState(false);
  const [reviews, setReviews] = useState([]);
  const comentario = useInput("");
  const valoracion = useInput(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //obtiene al user
  useEffect(() => {
    axios
      .post("/api/users/me")
      .then((cok) => dispatch(setUser(cok.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  //obtiene la propiedad
  useEffect(() => {
    axios
      .get(`/api/properties/${pid}`)
      .then((prop) => {
        setName(prop.data.name);
        setAddress(prop.data.address);
        setCountry(prop.data.country);
        setCity(prop.data.city);
        setNeighborhood(prop.data.neighborhood);
        setDescription(prop.data.description);
        setBathrooms(prop.data.bathrooms);
        setRooms(prop.data.rooms);
        setImages(prop.data.images);
        setPrice(prop.data.price);
        setCategories(prop.data.categories);
        setDisponibility(prop.data.disponibility);
      })
      .catch((err) => console.log(err));
  }, [modRes]);

  //modifica la propieda
  function handleMod(e) {
    e.preventDefault();

    axios
      .put(`/api/properties/mod/${pid}`, {
        name,
        address,
        country,
        city,
        neighborhood,
        description,
        bathrooms,
        rooms,
        images,
        price,
        categories,
        disponibility,
      })
      .then((mod) => {
        console.log(mod);
        if (mod.data[0] === 1) {
          alerts("Ok!", "La propiedad se modificó 👍", "success");
          setModRes(!modRes);
        } else {
          alerts("Ohoh!", "Ingrese datos validos 😵", "warning");
        }
      })
      .catch(() => {
        alerts("Auch!", "Ocurrio un error 🤧", "danger");
      });
  }

  //eliminar propiedad
  function hanldeDel(e) {
    e.preventDefault();

    axios
      .delete(`/api/properties/${pid}`)
      .then(() => {
        alerts("Ok!", "Propiedad eliminada 👍", "success");
        navigate("/");
      })
      .catch(() => {
        alerts("Ohno!", "La Propiedad no pudo eliminarse 🤨", "danger");
      });
  }

  //para saber si esta likeado
  useEffect(() => {
    axios.get("/api/favorites/find", { params: { uid, pid } }).then((fav) => {
      if (fav.data.pid) setLike(true);
      else setLike(false);
    });
  }, []);

  //likea
  function hanldeLike() {
    axios
      .post("/api/favorites/register", { data: { uid, pid } })
      .then((add) => {
        if (!uid) {
          alerts("Ojo!", "Necesitas estar logueado 💻", "warning");
        } else {
          if (add.data) {
            alerts("Eso!", "La propiedad se agrego a favoritos 💘", "success");
            setLike(true);
          } else {
            alerts(
              "Como te gusta darle al like!",
              "La propiedad ya esta en favoritos. 🤧",
              "warning"
            );
          }
        }
      });
  }

  //dislikea
  function hanldeDislike() {
    axios
      .delete("/api/favorites/delete", { data: { uid, pid } })
      .then((del) => {
        if (del.data === "OK") {
          alerts("Byebye!", "La propiedad se borro de favoritos 😵", "warning");
          setLike(false);
        }
      })
      .catch((del) => {
        if (del.code === "ERR_BAD_REQUEST") {
          return alerts(
            "Guarda campeon!",
            "La propiedad no esta en favoritos. 😡",
            "danger"
          );
        }
      });
  }

  //agrega review
  function handleReview(e) {
    e.preventDefault();

    axios
      .post("/api/reviews/register", {
        pid,
        uid,
        rating: valoracion.value,
        review: comentario.value,
      })
      .then((rev) => {
        if (rev.data[1]) {
          alerts("Vamos!", "La reseña se creó con exito 🏠", "success");
          setModRes(!modRes);
          valoracion.clearInput();
          comentario.clearInput();
        } else if (!rev.data[1]) {
          alerts("Pará!", "No puede hacer dos reseñas 🤠", "warning");
          valoracion.clearInput();
          comentario.clearInput();
        } else {
          alerts("Ey!", "Ingrese datos validos 😡", "warning");
        }
      })
      .catch((err) => console.log(err));
  }

  //encuentra todas las reviews
  useEffect(() => {
    axios
      .get(`/api/reviews/${pid}`)
      .then((rev) => setReviews(rev.data))
      .catch((err) => console.log(err));
  }, [modRes]);

  return (
    <div>
      <Navbar />

      <div className="home">
        <div className="home-titulo" style={{ "margin-bottom": "1%" }}>
          <h2 className="linea1" style={{ "text-transform": "uppercase" }}>
            {name}
          </h2>
        </div>
        <div className="property-card">
          <div className="user-datos" style={{ height: "817px" }}>
            <form>
              <img
                src={images}
                alt={name}
                style={{
                  objectFit: "cover",
                  width: "140px",
                  height: "140px",
                  border: "solid blue 1px",
                  padding: "3px",
                  "margin-left": "81%",
                  "border-radius": "0%",
                  "margin-bottom": "-15px",
                }}
              />

              <div className="inputName">
                <label> Nombre </label>
                <br></br>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div className="inputEmail">
                <label> Dirección </label>
                <br></br>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> Barrio </label>
                <br></br>
                <input
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> Ciudad </label>
                <br></br>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> País </label>
                <br></br>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> Baños </label>
                <br></br>
                <input
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> Habitaciones </label>
                <br></br>
                <input
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> Description </label>
                <br></br>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> Disponibilidad </label>
                <br></br>
                <input
                  value={disponibility}
                  onChange={(e) => setDisponibility(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> Categoría </label>
                <br></br>
                <input
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                ></input>
              </div>

              <div className="inputTel">
                <label> Precio </label>
                <br></br>
                <strong style={{ fontSize: "20px", borderBottom: "solid 1px" }}>
                  $
                </strong>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: "94.7%" }}
                ></input>
              </div>

              {user.admin ? (
                <>
                  <button
                    className="boton-editar"
                    onClick={(e) => handleMod(e)}
                    style={{ left: "69%", top: "94%" }}
                  >
                    MODIFICAR
                  </button>
                  <button
                    className="boton-editar "
                    onClick={(e) => hanldeDel(e)}
                    style={{ left: "81%", top: "94%" }}
                  >
                    ELIMINAR
                  </button>
                  {like ? (
                    <Link className="boton-like2" onClick={hanldeDislike}>
                      <img src="/boton-cora2.png" />
                    </Link>
                  ) : (
                    <Link className="boton-like2" onClick={hanldeLike}>
                      <img src="/boton-cora.png" />
                    </Link>
                  )}
                </>
              ) : (
                <>
                  {like ? (
                    <Link className="boton-like2" onClick={hanldeDislike}>
                      <img src="/boton-cora2.png" />
                    </Link>
                  ) : (
                    <Link className="boton-like2" onClick={hanldeLike}>
                      <img src="/boton-cora.png" />
                    </Link>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
        <div className="ver-comments">
          {/* //Titulo Reseñas */}
          <div
            className="home-titulo"
            style={{ "margin-bottom": "1%", color: "red" }}
          >
            <h2 className="linea1">RESEÑAS</h2>
          </div>
          {/* //Contendio Reseñas */}
          <div className="property-card">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  className="user-datos"
                  style={{
                    height: "170px",
                    "margin-top": "1%",
                  }}
                >
                  <input
                    value={review.user.name}
                    style={{ border: "none" }}
                  ></input>
                  <br></br>
                  <label> VALORACIÓN </label>
                  <br></br>
                  <input type="number" value={review.rating}></input>
                  <br></br>
                  <label> COMENTARIO </label>
                  <br></br>
                  <input type="text" value={review.review}></input>
                </div>
              ))
            ) : (
              <div className="home-titulo" style={{ border: "none" }}>
                <h2 className="linea1">NO HAY RESEÑAS</h2>
              </div>
            )}
          </div>
        </div>
        {/* //Titulo Escribir Reseña */}
        <div className="escribir-comments">
          <div
            className="home-titulo"
            style={{ "margin-bottom": "1%", color: "red" }}
          >
            <h2 className="linea1">ESCRIBIR RESEÑA</h2>
          </div>
          {/* Contenido */}
          <div className="property-card">
            <div
              className="user-datos"
              style={{ height: "170px", position: "relative" }}
            >
              <form onSubmit={handleReview}>
                <div>
                  <label> VALORACIÓN </label>
                  <br></br>
                  <input
                    {...valoracion}
                    type="number"
                    required
                    min={1}
                    max={5}
                  ></input>
                </div>

                <div>
                  <label> COMENTARIO </label>
                  <br></br>
                  <input
                    {...comentario}
                    type="text"
                    minLength={5}
                    maxLength={100}
                    required
                  ></input>
                </div>

                <button
                  className="boton-editar"
                  style={{ left: "87%", top: "78%" }}
                >
                  GUARDAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
