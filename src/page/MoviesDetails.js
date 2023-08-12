import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import OfficialVideosElement from "../components/OfficialVideosElement";
import SimilarMoviesElement from "../components/SimilarMoviesElement";
import Seceret from "../Seceret";
import { motion } from "framer-motion";

const MoviesDetails = () => {
  
 
  //.env
  const { id } = useParams();
  const [isloaded, setloaded] = useState(true);
  const [iserror, seterror] = useState(false);
  const [ResultFromApi, setResultFromapi] = useState(null);
  const [SimilarMoviedata, SetSimilarMoviedata] = useState(null);
  const [Castdata, SetCastdata] = useState(null);
  const [videosdata, Setvideosdata] = useState(null);
  const [ImageUrl, setImageUrl] = useState("https://image.tmdb.org/t/p/original");
  
  // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1

  const SimilarMovies = `${Seceret.BASE_URL}/3/movie/${id}/similar?api_key=${Seceret&&Seceret.API_KEY}&language=en-US&page=1`;
  const MoviesDetailsURL = `${Seceret.BASE_URL}/3/movie/${id}?api_key=${Seceret&&Seceret.API_KEY}&language=en-US`;
  const CastDetailUrl = `  ${Seceret.BASE_URL}/3/movie/${id}/casts?api_key=${Seceret&&Seceret.API_KEY}`;
  const GetVideosurl = `${Seceret.BASE_URL}/3/movie/${id}/videos?api_key=${Seceret&&Seceret.API_KEY}&language=en-US`;


  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const GetDetails = async () => {
    await axios
      .get(MoviesDetailsURL)
      .then((resp) => {
        setloaded(false);
        setResultFromapi(resp.data);
      })
      .catch((error) => {
        seterror(error);
      });
  };
  const GetSimilarMovies = async () => {
    await axios
      .get(SimilarMovies)
      .then((resp) => {
        setloaded(false);
        SetSimilarMoviedata(resp.data);

        SetSimilarMoviedata(resp.data.results);
      })
      .catch((error) => {
        seterror(error);
      });
  };

  const GetCast = async () => {
    await axios
      .get(CastDetailUrl)
      .then((resp) => {
        setloaded(false);
        SetCastdata(resp.data.cast);
      })
      .catch((error) => {
        seterror(error);
      });
  };

  const GetVideos = async () => {
    await axios
      .get(GetVideosurl)
      .then((resp) => {
        setloaded(false);
        Setvideosdata(resp.data.results);
      })
      .catch((error) => {
        seterror(error);
      });
  };


  useEffect(() => {
    GetDetails();
    GetSimilarMovies();
    GetCast();
    GetVideos();
  }, [id]);

  if (
    isloaded ||
    Castdata === null ||
    SimilarMoviedata === null ||
    videosdata === null ||
    ResultFromApi === null
  ) {
    return (
      <div className="Load-div">
        <h2 style={{ color: "white" }}>
          <img
            style={{ height: "150px", width: "50%" }}
            src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif"
            alt="loading"
          />
        </h2>
      </div>
    );
  } else if (iserror) {
    return <h2>{iserror}</h2>;
  } else {
    return (
      <>
        {ResultFromApi ? (
          <div className="movie-details">
            <div className="movieinfo">
              <section className="moviedetail-row-1">
                <figure>
                  <motion.img    
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                    key={ResultFromApi.id}
                    alt={ResultFromApi.title}
                    src={ImageUrl.concat(ResultFromApi.poster_path)}
                  />
                </figure>
              </section>
              <section className="moviedetail-row-2">
                <motion.h2 initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }} className="title">{ResultFromApi.title}</motion.h2>

                <section className="movie-times">
                  <span>
                    <span> {Math.floor(ResultFromApi.runtime / 60)}Hour </span>
                    {ResultFromApi.runtime % 60}Min
                  </span>
                  <span>{ResultFromApi.release_date}</span>
                </section>

                <article className="overview">
                  <h2>Overview</h2>
                  <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  >{ResultFromApi.overview}</motion.p>
                  <h4 className="tagline-head">TAGLINE</h4>
                  {ResultFromApi.tagline ? (
                    <h2  className="tagline">{ResultFromApi.tagline}</h2>
                  ) : null}
                </article>

                <section className="movie-times">
                  <span>Geners:</span>
                  {ResultFromApi.genres.map((x, i) => {
                    return <span key={i}>{x.name}</span>;
                  })}
                </section>

                <section className="movie-times">
                  <span>User Score</span>
                  <span>
                    {Math.ceil(ResultFromApi.vote_average) * 10}{" "}
                    <strong>%</strong>
                  </span>
                </section>

                <section>
                  <h2 className="overview">similar Movies</h2>
                  <div className="recommend">
                    <SimilarMoviesElement
                      UrlImage={ImageUrl}
                      similardata={SimilarMoviedata}
                      ids={ResultFromApi.id}
                    />
                  </div>
                </section>
              </section>
            </div>
            <section className="casts">
              <h2>Cast</h2>

              <figure>
                {Castdata ? (
                  Castdata.map((person, i) => {
                    return person.profile_path ? (
                      <motion.img


                      initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 3 }}
                        key={i}
                        src={ImageUrl.concat(person.profile_path)}
                        alt={person.name}
                      />
                    ) : (
                      <img
                        key={i}
                        src="https://www.pngkey.com/png/detail/73-730477_first-name-profile-image-placeholder-png.png"
                        alt={person.name}
                      />
                    );
                  })
                ) : (
                  <div>{null}</div>
                )}
              </figure>
            </section>

            {videosdata ? (
              <OfficialVideosElement data={videosdata} />
            ) : (
              <div>{null}</div>
            )}
          </div>
        ) : (
          <div className="Load-div">
            <h2 style={{ color: "white" }}>Loading.......</h2>
          </div>
        )}
      </>
    );
  }
};

export default MoviesDetails;
