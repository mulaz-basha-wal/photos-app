import React, { useEffect, useState, useContext } from "react";
import PhotosContext from "./PhotosContext";
import axios from "axios";
import "./styles/pagination.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function PaginationWidget() {
  const { dispatch } = useContext(PhotosContext);
  const albumLink = "https://jsonplaceholder.typicode.com/albums/";
  const [current, setCurrent] = useState(1);
  const [albumData, setAlbumData] = useState([]);
  const first = 1;
  const last = albumData.length;

  useEffect(() => {
    axios
      .get(albumLink)
      .then((res) => {
        setAlbumData([...res.data]);
      })
      .catch((error) => console.log(error));
  }, []);

  const onClickFirst = (e) => {
    e.preventDefault();
    const currentUrl = albumLink + `${first}/photos`;
    axios
      .get(currentUrl)
      .then((res) => {
        dispatch({ type: "last", data: res.data });
        setCurrent(first);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickLast = (e) => {
    e.preventDefault();
    const currentUrl = albumLink + `${last}/photos`;
    axios
      .get(currentUrl)
      .then((res) => {
        dispatch({ type: "last", data: res.data });
        setCurrent(last);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickPrev = (e) => {
    e.preventDefault();
    const currentUrl = albumLink + `${current - 1}/photos`;
    if (current !== first) {
      axios
        .get(currentUrl)
        .then((res) => {
          dispatch({ type: "prev", data: res.data });
          setCurrent((current) => current - 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const onClickNext = (e) => {
    e.preventDefault();
    const currentUrl = albumLink + `${current + 1}/photos`;
    if (current !== last) {
      axios
        .get(currentUrl)
        .then((res) => {
          dispatch({ type: "next", data: res.data });
          setCurrent((current) => current + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Pagination className='container'>
      <PaginationItem>
        <PaginationLink
          first
          className='first'
          href={albumLink + `${first}/photos`}
          onClick={onClickFirst}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          className='prev'
          href={albumLink + `${current > 1 ? current - 1 : 1}/photos`}
          onClick={onClickPrev}
        />
      </PaginationItem>
      <PaginationItem id='center-display-items'>
        <PaginationLink
          href={albumLink + `${current}/photos`}
          onClick={(e) => {
            e.preventDefault();
          }}>
          {albumData.length > 0
            ? `Album_${albumData[current - 1].id}. ${
                albumData[current - 1].title
              }`
            : "Welcome to Photos Album"}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          next
          className='next'
          href={albumLink + `${current + 1}/photos`}
          onClick={onClickNext}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          className='last'
          href={albumLink + `${last}/photos`}
          onClick={onClickLast}
        />
      </PaginationItem>
    </Pagination>
  );
}
