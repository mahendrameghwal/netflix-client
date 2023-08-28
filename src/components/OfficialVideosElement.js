import React, { useState } from "react";
import 'rodal/lib/rodal.css';

import ReactPlayer from 'react-player/lazy'

// Lazy load the YouTube player


const OfficialVideosElement = ({ data }) => {
 



  return (
    <div>
      {data.length === 0 ? (
        <div>{null}</div>
      ) : (
        <h2 className="movieinfo">Official videos</h2>
      )}

      <section className=" ofvideos">
        <section>
          {data.map(Videos => {
            // eslint-disable-next-line no-lone-blocks
            {
              return Videos.key === null ? (
                <div>{null}</div>
               
              ) : (
                <figure key={Videos.key} className="video-div">
                 
                
                 
                  <ReactPlayer style={{margin:"10px 10px"}} controls={true}
                 width={180}  height={180} pip={true}
                  url={`https://www.youtube.com/watch?v=${Videos.key}`}
                />
                 
                  </figure>
                  );
            }
          })}
        </section>
      </section>
    </div>
  );
};

export default OfficialVideosElement;

