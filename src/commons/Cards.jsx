import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";
import { alerts } from "../utils/alerts";

function Cards({ property, modFavs }) {
  const user = useSelector((state) => state.user);
  const uid = user.id;
  const pid = property.id;
  const [like, setLike] = useState(false);

  useEffect(() => {
    axios.get("/api/favorites/find", { params: { uid, pid } }).then((fav) => {
      if (fav.data.pid) setLike(true);
      else setLike(false);
    });
  }, [like, pid, uid]);

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

  function hanldeDislike() {
    axios
      .delete("/api/favorites/delete", { data: { uid, pid } })
      .then((del) => {
        if (del.data === "OK") {
          alerts("Byebye!", "La propiedad se borro de favoritos 😵", "warning");
          modFavs();
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

  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDate() {}

  return (
    <>
      <div id={property.id} className="todo-tarjeta">
        <div className="imagen">
          <img src={property.images} alt={property.name} />
        </div>
        <div className="texto">
          <div className="rectangulo-uno">
            <div className="cuadradito-uno">
              <p>
                <strong>$</strong> {property.price}
              </p>
            </div>
            <div className="cuadradito-cuatro">
              <img src="/logo-city.png" />
              <p>{property.city}</p>
            </div>
          </div>
          <div className="rectangulo-uno">
            <div className="cuadradito-dos">
              <img src="/logo-metro.png" />
              <p> 100 m²</p>
            </div>
            <div className="cuadradito-tres">
              <img src="/logo-bed.png" />
              <p>{property.rooms} dorm.</p>
            </div>
            <div className="cuadradito-cinco">
              <img src="/logo-bath.png" />
              <p>{property.bathrooms} baños</p>
            </div>
          </div>
          <div className="rectangulo-dos">
            <p>{property.description}</p>
          </div>
          <div className="rectangulo-tres">
            {like ? (
              <Link className="boton-like" onClick={hanldeDislike}>
                <img src="/boton-cora2.png" />
              </Link>
            ) : (
              <Link className="boton-like" onClick={hanldeLike}>
                <img src="/boton-cora.png" />
              </Link>
            )}
            <Link className="boton-cita" onClick={handleDate}>
              <img src="/boton-cita.png" />
            </Link>
            <Link
              onClick={handleScroll}
              className="boton-mas"
              to={`/properties/${property.id}`}
            >
              VER MÁS
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
