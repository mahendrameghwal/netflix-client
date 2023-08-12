import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoviesDetails from "../page/MoviesDetails";
import { motion } from "framer-motion";
const Rows = ({ Row_name, data }) => {
  const [loaded, setloaded] = useState(false);
  const Img_Url = "https://image.tmdb.org/t/p/original";
  <MoviesDetails imgurl={Img_Url} />;
  //single poster in this poster data comes from props
  const Poster = ({ row_name, data, id }) => {

    const item = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1
      }
    }



    return (
      <motion.div variants={item}  whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }} className="poster-img">
        <Link to={`/moviedetail/${id}`}>
          <img alt={data.id} src={Img_Url.concat(data)} />
        </Link>
      </motion.div>
    );
  };

  //poster data map
  return (
    <>
      {data ? (
        <div>
          <h2 className="title">{Row_name}</h2>
          <div className="row-section">
            {data.map((movies) => {
              return (
             
              <Poster
              Row_name={Row_name}
              data={movies.poster_path}
              id={movies.id}
              key={movies.id}
            /> 
              
             
              );
            })}
          </div>{" "}
        </div>
      ) : (
        <div className="Load">
          <h2>Loading........</h2>
        </div>
      )}
    </>
  );
};

export default Rows;
